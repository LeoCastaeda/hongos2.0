import { NextResponse } from 'next/server';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';
import { readCartToken, writeCartToken } from '@/lib/woocommerce/cart-cookie';
import {
  addStoreCartItem,
  getStoreCartTotal,
  mapStoreCartToItems,
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
      productId?: number;
      quantity?: number;
    };
    const productId = Number(body.productId);
    const quantity = Number(body.quantity ?? 1);

    if (!Number.isFinite(productId) || productId <= 0) {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 });
    }
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 20) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const token = await readCartToken();
    const { cart, cartToken } = await addStoreCartItem(
      productId,
      quantity,
      token
    );
    if (cartToken) await writeCartToken(cartToken);

    return NextResponse.json({
      mode: 'woocommerce',
      items: mapStoreCartToItems(cart),
      total: getStoreCartTotal(cart),
      itemsCount: cart.items_count ?? 0,
    });
  } catch (error) {
    console.error('[api/cart/add]', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Could not add to cart',
      },
      { status: 502 }
    );
  }
}
