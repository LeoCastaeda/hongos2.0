import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import { buildCartPayload } from '@/lib/woocommerce/cart-response';
import { removeStoreCartItem } from '@/lib/woocommerce/store-cart';

export async function POST(request: Request) {
  if (!isWooStoreConfigured()) {
    return NextResponse.json(
      { mode: 'local', error: 'WooCommerce cart is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as { key?: string };
    const key = body.key?.trim();
    if (!key) {
      return NextResponse.json({ error: 'Missing cart item key' }, { status: 400 });
    }

    const token = await readCartToken();
    const { cart, cartToken } = await removeStoreCartItem(key, token);
    const built = await buildCartPayload(cart, cartToken);
    if (built.cartToken) await writeCartToken(built.cartToken);

    return NextResponse.json(built.payload);
  } catch (error) {
    console.error('[api/cart/remove]', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Could not remove cart item',
      },
      { status: 502 }
    );
  }
}
