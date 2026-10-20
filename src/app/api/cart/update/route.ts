import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import {
  getStoreCartTotal,
  mapStoreCartToItems,
  removeStoreCartItem,
  updateStoreCartItem,
} from '@/lib/woocommerce/store-cart';

export async function POST(request: Request) {
  if (!isWooStoreConfigured()) {
    return NextResponse.json(
      { mode: 'local', error: 'WooCommerce cart is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      key?: string;
      quantity?: number;
    };
    const key = body.key?.trim();
    const quantity = Number(body.quantity);

    if (!key) {
      return NextResponse.json({ error: 'Missing cart item key' }, { status: 400 });
    }

    const token = await readCartToken();
    const result =
      quantity <= 0
        ? await removeStoreCartItem(key, token)
        : await updateStoreCartItem(key, quantity, token);

    if (result.cartToken) await writeCartToken(result.cartToken);

    return NextResponse.json({
      mode: 'woocommerce',
      items: mapStoreCartToItems(result.cart),
      total: getStoreCartTotal(result.cart),
      itemsCount: result.cart.items_count ?? 0,
    });
  } catch (error) {
    console.error('[api/cart/update]', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Could not update cart item',
      },
      { status: 502 }
    );
  }
}
