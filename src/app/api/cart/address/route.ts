import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import { buildCartPayload } from '@/lib/woocommerce/cart-response';
import {
  toCountryCode,
  updateStoreCustomer,
  type StoreAddress,
} from '@/lib/woocommerce/store-checkout';
import { normalizeSpainState } from '@/lib/woocommerce/spain-provinces';
import type { StoreCart } from '@/lib/woocommerce/store-cart';

export async function POST(request: Request) {
  if (!isWooStoreConfigured()) {
    return NextResponse.json(
      { mode: 'local', error: 'WooCommerce cart is not configured' },
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
    };

    if (!body.postalCode || !body.country || !body.city) {
      return NextResponse.json(
        { error: 'city, country and postalCode are required' },
        { status: 400 }
      );
    }

    const country = toCountryCode(body.country);
    const address: StoreAddress = {
      first_name: body.firstName || 'Cliente',
      last_name: body.lastName || '',
      address_1: body.address || '—',
      address_2: body.apartment || '',
      city: body.city,
      state:
        country === 'ES'
          ? normalizeSpainState(body.province)
          : (body.province || '').trim(),
      postcode: body.postalCode,
      country,
      email: body.email || '',
      phone: body.phone || '',
    };

    const token = await readCartToken();
    if (!token) {
      return NextResponse.json(
        { error: 'No hay carrito activo' },
        { status: 400 }
      );
    }

    const customer = await updateStoreCustomer(address, token);
    const cart = customer.data as StoreCart;
    const built = await buildCartPayload(cart, customer.cartToken);
    if (built.cartToken) await writeCartToken(built.cartToken);

    return NextResponse.json(built.payload);
  } catch (error) {
    console.error('[api/cart/address]', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo calcular el envío',
      },
      { status: 502 }
    );
  }
}
