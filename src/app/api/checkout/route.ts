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
import { normalizeStateForCountry } from '@/lib/woocommerce/shipping-regions';
import {
  createHostedPaymentOrder,
  needsHostedPayment,
} from '@/lib/woocommerce/hosted-checkout';
import { buildSquarePaymentData } from '@/lib/woocommerce/square-payment-data';
import { isSquareEmbeddedConfigured } from '@/lib/square/config';

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
      province?: string;
      locale?: string;
      squarePayment?: {
        nonce?: string;
        cardType?: string;
        lastFour?: string;
        expMonth?: string;
        expYear?: string;
        postalCode?: string;
        buyerVerificationToken?: string;
      };
    };

    if (
      !body.email ||
      !body.firstName ||
      !body.lastName ||
      !body.address ||
      !body.city ||
      !body.postalCode ||
      !body.phone ||
      !body.province
    ) {
      return NextResponse.json(
        { error: 'Faltan datos de envío (teléfono y provincia incluidos).' },
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
      state: normalizeStateForCountry(country, body.province),
      postcode: body.postalCode,
      country,
      email: body.email,
      phone: body.phone.trim(),
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

    const squareNonce = body.squarePayment?.nonce?.trim();
    const canEmbedSquare =
      preferred === 'square_credit_card' &&
      Boolean(squareNonce) &&
      isSquareEmbeddedConfigured();

    // Square without embedded token → pending order + branded bridge → WP order-pay.
    if (needsHostedPayment(preferred, { hasSquareToken: canEmbedSquare })) {
      const hosted = await createHostedPaymentOrder({
        cart: shippingReady.cart,
        address,
        paymentMethod: preferred,
        cartToken: token,
      });

      const locale = body.locale === 'en' ? 'en' : 'es';
      const bridge = new URL(`${appOrigin(request)}/${locale}/checkout/pay`);
      bridge.searchParams.set('pay_url', hosted.payUrl);
      bridge.searchParams.set('order_id', String(hosted.order.id));
      bridge.searchParams.set('key', hosted.order.order_key);

      return NextResponse.json({
        orderId: hosted.order.id,
        orderKey: hosted.order.order_key,
        status: hosted.order.status,
        paymentStatus: 'pending',
        paymentMethod: preferred,
        needsExternalPayment: true,
        payUrl: hosted.payUrl,
        url: bridge.toString(),
      });
    }

    const paymentData =
      canEmbedSquare && body.squarePayment?.nonce
        ? buildSquarePaymentData({
            nonce: body.squarePayment.nonce,
            cardType: body.squarePayment.cardType,
            lastFour: body.squarePayment.lastFour,
            expMonth: body.squarePayment.expMonth,
            expYear: body.squarePayment.expYear,
            postalCode: body.squarePayment.postalCode || address.postcode,
            buyerVerificationToken: body.squarePayment.buyerVerificationToken,
          })
        : [];

    try {
      const result = await processStoreCheckout({
        billing: address,
        shipping: address,
        paymentMethod: preferred,
        cartToken: token,
        paymentData,
      });

      if (result.cartToken) {
        await writeCartToken(result.cartToken);
      }

      const locale = body.locale === 'en' ? 'en' : 'es';
      const fallbackSuccess = `${appOrigin(request)}/${locale}/checkout/success?order_id=${result.orderId}&key=${encodeURIComponent(result.orderKey)}`;

      const url = result.redirectUrl || fallbackSuccess;

      return NextResponse.json({
        orderId: result.orderId,
        orderKey: result.orderKey,
        status: result.status,
        paymentStatus: result.paymentStatus,
        paymentMethod: preferred,
        needsExternalPayment: Boolean(result.redirectUrl),
        url,
      });
    } catch (storeError) {
      // Embedded Square via Store API often 400s (SCA / payment_data). Fall
      // back to the working hosted order-pay bridge so checkout isn't blocked.
      if (canEmbedSquare) {
        console.warn(
          '[api/checkout] Store Square failed, falling back to hosted pay',
          storeError
        );
        const hosted = await createHostedPaymentOrder({
          cart: shippingReady.cart,
          address,
          paymentMethod: preferred,
          cartToken: token,
        });

        const locale = body.locale === 'en' ? 'en' : 'es';
        const bridge = new URL(`${appOrigin(request)}/${locale}/checkout/pay`);
        bridge.searchParams.set('pay_url', hosted.payUrl);
        bridge.searchParams.set('order_id', String(hosted.order.id));
        bridge.searchParams.set('key', hosted.order.order_key);

        return NextResponse.json({
          orderId: hosted.order.id,
          orderKey: hosted.order.order_key,
          status: hosted.order.status,
          paymentStatus: 'pending',
          paymentMethod: preferred,
          needsExternalPayment: true,
          payUrl: hosted.payUrl,
          url: bridge.toString(),
          embedFallback: true,
          embedError:
            storeError instanceof Error ? storeError.message : String(storeError),
        });
      }
      throw storeError;
    }
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
