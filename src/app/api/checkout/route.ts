import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import {
  getStorePaymentMethods,
  pickPreferredPaymentMethod,
  processStoreCheckout,
  toCountryCode,
  updateStoreCustomer,
  type StoreAddress,
} from '@/lib/woocommerce/store-checkout';
import {
  ensureShippingRateSelected,
  type StoreCart,
} from '@/lib/woocommerce/store-cart';

function appOrigin(request: Request) {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!isWooStoreConfigured()) {
    return NextResponse.json(
      { error: 'WooCommerce no está configurado.' },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      firstName?: string;
      lastName?: string;
      address?: string;
      apartment?: string;
      city?: string;
      country?: string;
      postalCode?: string;
      phone?: string;
      locale?: string;
    };

    if (
      !body.email ||
      !body.firstName ||
      !body.lastName ||
      !body.address ||
      !body.city ||
      !body.postalCode
    ) {
      return NextResponse.json(
        { error: 'Faltan datos de envío.' },
        { status: 400 }
      );
    }

    const country = toCountryCode(body.country || 'ES');
    const address: StoreAddress = {
      first_name: body.firstName,
      last_name: body.lastName,
      address_1: body.address,
      address_2: body.apartment || '',
      city: body.city,
      state: '',
      postcode: body.postalCode,
      country,
      email: body.email,
      phone: body.phone || '',
    };

    let token = await readCartToken();
    if (!token) {
      return NextResponse.json(
        { error: 'Tu carrito de WooCommerce está vacío o ha caducado.' },
        { status: 400 }
      );
    }

    const customer = await updateStoreCustomer(address, token);
    if (customer.cartToken) {
      token = customer.cartToken;
      await writeCartToken(token);
    }

    const shippingReady = await ensureShippingRateSelected(
      customer.data as StoreCart,
      token
    );
    if (shippingReady.cartToken) {
      token = shippingReady.cartToken;
      await writeCartToken(token);
    }

    const methods = await getStorePaymentMethods(token);
    if (methods.cartToken) {
      token = methods.cartToken;
      await writeCartToken(token);
    }

    const preferred = pickPreferredPaymentMethod(methods.methods);

    if (!preferred) {
      return NextResponse.json(
        {
          error:
            'No hay métodos de pago activos en WooCommerce. En WP: WooCommerce → Ajustes → Pagos. Activa Square, Stripe, PayPal o transferencia.',
        },
        { status: 502 }
      );
    }

    const result = await processStoreCheckout({
      billing: address,
      shipping: address,
      paymentMethod: preferred,
      cartToken: token,
    });

    if (result.cartToken) {
      await writeCartToken(result.cartToken);
    }

    const locale = body.locale === 'en' ? 'en' : 'es';
    const fallbackSuccess = `${appOrigin(request)}/${locale}/checkout/success?order_id=${result.orderId}&key=${encodeURIComponent(result.orderKey)}`;

    return NextResponse.json({
      orderId: result.orderId,
      orderKey: result.orderKey,
      status: result.status,
      paymentStatus: result.paymentStatus,
      paymentMethod: preferred,
      url: result.redirectUrl || fallbackSuccess,
    });
  } catch (error) {
    console.error('[api/checkout]', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo completar el pedido en WooCommerce.',
      },
      { status: 502 }
    );
  }
}
