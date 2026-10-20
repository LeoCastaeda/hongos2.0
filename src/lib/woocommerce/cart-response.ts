import type { CartItem } from '@/lib/types';
import {
  ensureShippingRateSelected,
  mapStoreCartToItems,
  mapStoreCartTotals,
  type CartTotalsSummary,
  type StoreCart,
} from './store-cart';

export type CartApiPayload = {
  mode: 'woocommerce';
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  shippingLabel: string | null;
  needsShipping: boolean;
  hasCalculatedShipping: boolean;
  itemsCount: number;
};

export async function buildCartPayload(
  cart: StoreCart,
  cartToken: string | null
): Promise<{ payload: CartApiPayload; cartToken: string | null }> {
  const ensured = await ensureShippingRateSelected(cart, cartToken);
  const totals: CartTotalsSummary = mapStoreCartTotals(ensured.cart);

  return {
    cartToken: ensured.cartToken,
    payload: {
      mode: 'woocommerce',
      items: mapStoreCartToItems(ensured.cart),
      total: totals.total,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      shippingLabel: totals.shippingLabel,
      needsShipping: totals.needsShipping,
      hasCalculatedShipping: totals.hasCalculatedShipping,
      itemsCount: ensured.cart.items_count ?? 0,
    },
  };
}
