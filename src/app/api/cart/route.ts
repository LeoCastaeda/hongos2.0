import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import { buildCartPayload } from '@/lib/woocommerce/cart-response';
import { getStoreCart } from '@/lib/woocommerce/store-cart';

export async function GET() {
  if (!isWooStoreConfigured()) {
    return NextResponse.json({
      mode: 'local',
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      shippingLabel: null,
      needsShipping: false,
      hasCalculatedShipping: false,
    });
  }

  try {
    const token = await readCartToken();
    const { cart, cartToken } = await getStoreCart(token);
    const built = await buildCartPayload(cart, cartToken);
    if (built.cartToken) await writeCartToken(built.cartToken);

    return NextResponse.json(built.payload);
  } catch (error) {
    console.error('[api/cart GET]', error);
    return NextResponse.json(
      {
        mode: 'woocommerce',
        error: error instanceof Error ? error.message : 'Cart error',
        items: [],
        total: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        shippingLabel: null,
        needsShipping: false,
        hasCalculatedShipping: false,
      },
      { status: 502 }
    );
  }
}
