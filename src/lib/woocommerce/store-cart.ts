import { products as localProducts } from '@/lib/data';
import type { CartItem, Product } from '@/lib/types';
import { findCatalogEntry } from './catalog-map';
import { getWooStoreBaseUrl } from './config';
import { WooCommerceError } from './client';

export const CART_TOKEN_COOKIE = 'wc_cart_token';

type StoreCartPrices = {
  price: string;
  regular_price?: string;
  sale_price?: string;
  currency_minor_unit?: number;
};

type StoreCartImage = {
  id: number;
  src: string;
  thumbnail?: string;
  name?: string;
  alt?: string;
};

export type StoreCartItem = {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description?: string;
  description?: string;
  permalink?: string;
  images?: StoreCartImage[];
  prices: StoreCartPrices;
};

export type StoreShippingRateOption = {
  rate_id: string;
  name: string;
  description?: string;
  price: string;
  selected?: boolean;
};

export type StoreShippingPackage = {
  package_id: number | string;
  name?: string;
  shipping_rates?: StoreShippingRateOption[];
};

export type StoreCart = {
  items: StoreCartItem[];
  items_count: number;
  needs_shipping?: boolean;
  has_calculated_shipping?: boolean;
  shipping_rates?: StoreShippingPackage[];
  totals: {
    total_items?: string;
    total_items_tax?: string;
    total_fees?: string;
    total_fees_tax?: string;
    total_discount?: string;
    total_discount_tax?: string;
    total_shipping?: string | null;
    total_shipping_tax?: string | null;
    total_price?: string;
    total_tax?: string;
    currency_minor_unit?: number;
  };
};

export type CartTotalsSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingLabel: string | null;
  needsShipping: boolean;
  hasCalculatedShipping: boolean;
};

type StoreCartResult = {
  cart: StoreCart;
  cartToken: string | null;
};

function minorToMajor(value: string | null | undefined, minorUnit = 2): number {
  if (value == null || value === '') return 0;
  const raw = Number.parseInt(value, 10);
  if (!Number.isFinite(raw)) return 0;
  return raw / 10 ** minorUnit;
}

function mapStoreItemToCartItem(item: StoreCartItem): CartItem {
  const entry = findCatalogEntry({ wooId: item.id });
  const local = localProducts.find((p) => p.slug === entry?.localSlug);
  const minor = item.prices.currency_minor_unit ?? 2;
  const price = minorToMajor(item.prices.price, minor);

  const product: Product = {
    id: `woo-${item.id}`,
    wooId: item.id,
    name: local?.name || item.name,
    slug: entry?.localSlug || local?.slug || String(item.id),
    price,
    description: local?.description || '',
    benefits: local?.benefits ?? [],
    howToUse: local?.howToUse ?? '',
    labResults: local?.labResults ?? '',
    faqs: local?.faqs ?? [],
    image: local?.image ?? '',
    imageUrl: item.images?.[0]?.src || item.images?.[0]?.thumbnail || local?.imageUrl,
    type: local?.type ?? 'tincture',
    category: local?.category ?? 'Medicinal',
    benefitCategory: local?.benefitCategory ?? 'immunity',
    isBestSeller: local?.isBestSeller,
    inStock: true,
    source: 'woocommerce',
  };

  return { product, quantity: item.quantity, key: item.key };
}

export function mapStoreCartToItems(cart: StoreCart): CartItem[] {
  return (cart.items ?? []).map(mapStoreItemToCartItem);
}

export function getStoreCartTotal(cart: StoreCart): number {
  const minor = cart.totals?.currency_minor_unit ?? 2;
  return minorToMajor(cart.totals?.total_price ?? '0', minor);
}

export function getSelectedShippingLabel(cart: StoreCart): string | null {
  for (const pkg of cart.shipping_rates ?? []) {
    const selected = pkg.shipping_rates?.find((rate) => rate.selected);
    if (selected?.name) return selected.name;
  }
  return null;
}

export function mapStoreCartTotals(cart: StoreCart): CartTotalsSummary {
  const minor = cart.totals?.currency_minor_unit ?? 2;
  const shipping =
    minorToMajor(cart.totals?.total_shipping, minor) +
    minorToMajor(cart.totals?.total_shipping_tax, minor);

  return {
    subtotal: minorToMajor(cart.totals?.total_items, minor),
    shipping,
    tax: minorToMajor(cart.totals?.total_tax, minor),
    total: minorToMajor(cart.totals?.total_price, minor),
    shippingLabel: getSelectedShippingLabel(cart),
    needsShipping: Boolean(cart.needs_shipping),
    hasCalculatedShipping: Boolean(cart.has_calculated_shipping),
  };
}

export async function selectStoreShippingRate(
  packageId: number | string,
  rateId: string,
  cartToken?: string | null
) {
  return storeFetch('/cart/select-shipping-rate', {
    method: 'POST',
    cartToken,
    body: {
      package_id: Number(packageId),
      rate_id: rateId,
    },
  });
}

/** Picks the first available rate on each package when none is selected yet. */
export async function ensureShippingRateSelected(
  cart: StoreCart,
  cartToken?: string | null
): Promise<StoreCartResult> {
  let current = cart;
  let token = cartToken ?? null;

  for (const pkg of current.shipping_rates ?? []) {
    const rates = pkg.shipping_rates ?? [];
    if (!rates.length) continue;
    if (rates.some((rate) => rate.selected)) continue;

    const result = await selectStoreShippingRate(
      pkg.package_id,
      rates[0].rate_id,
      token
    );
    current = result.cart;
    token = result.cartToken;
  }

  return { cart: current, cartToken: token };
}

async function storeFetch(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    cartToken?: string | null;
  } = {}
): Promise<StoreCartResult> {
  const baseUrl = getWooStoreBaseUrl();
  if (!baseUrl) {
    throw new WooCommerceError('WooCommerce Store API is not configured', 503);
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (options.cartToken) {
    headers['Cart-Token'] = options.cartToken;
  }

  const response = await fetch(`${baseUrl}/wp-json/wc/store/v1${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  const cartToken =
    response.headers.get('Cart-Token') ||
    response.headers.get('cart-token') ||
    options.cartToken ||
    null;

  const json = (await response.json().catch(() => ({}))) as StoreCart & {
    code?: string;
    message?: string;
    data?: { cart?: StoreCart };
  };

  if (!response.ok) {
    // 409 responses often include the latest cart snapshot
    if (response.status === 409 && json.data?.cart) {
      return { cart: json.data.cart, cartToken };
    }
    throw new WooCommerceError(
      json.message || `Store API ${response.status}`,
      response.status
    );
  }

  return { cart: json as StoreCart, cartToken };
}

export async function getStoreCart(cartToken?: string | null) {
  return storeFetch('/cart', { cartToken });
}

export async function addStoreCartItem(
  productId: number,
  quantity: number,
  cartToken?: string | null
) {
  let token = cartToken;
  if (!token) {
    const empty = await getStoreCart(null);
    token = empty.cartToken;
  }
  return storeFetch('/cart/add-item', {
    method: 'POST',
    cartToken: token,
    body: { id: productId, quantity },
  });
}

export async function updateStoreCartItem(
  key: string,
  quantity: number,
  cartToken?: string | null
) {
  return storeFetch('/cart/update-item', {
    method: 'POST',
    cartToken,
    body: { key, quantity },
  });
}

export async function removeStoreCartItem(
  key: string,
  cartToken?: string | null
) {
  return storeFetch('/cart/remove-item', {
    method: 'POST',
    cartToken,
    body: { key },
  });
}

export async function clearStoreCart(cartToken?: string | null) {
  // Store API has DELETE /cart/items
  return storeFetch('/cart/items', {
    method: 'DELETE',
    cartToken,
  });
}
