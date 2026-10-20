import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import {
  getStoreCart,
  getStoreCartTotal,
  mapStoreCartToItems,
} from '@/lib/woocommerce/store-cart';

export async function GET() {
  if (!isWooStoreConfigured()) {
    return NextResponse.json({ mode: 'local', items: [], total: 0 });
  }

  try {
    const token = await readCartToken();
    const { cart, cartToken } = await getStoreCart(token);
    if (cartToken) await writeCartToken(cartToken);

    return NextResponse.json({
      mode: 'woocommerce',
      items: mapStoreCartToItems(cart),
      total: getStoreCartTotal(cart),
      itemsCount: cart.items_count ?? 0,
    });
  } catch (error) {
    console.error('[api/cart GET]', error);
    return NextResponse.json(
      {
        mode: 'woocommerce',
        error: error instanceof Error ? error.message : 'Cart error',
        items: [],
        total: 0,
      },
      { status: 502 }
    );
  }
}
