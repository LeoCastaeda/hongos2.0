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

export type StoreCart = {
  items: StoreCartItem[];
  items_count: number;
  totals: {
    total_items: string;
    total_price: string;
    currency_minor_unit?: number;
  };
};

type StoreCartResult = {
  cart: StoreCart;
  cartToken: string | null;
};

function minorToMajor(value: string, minorUnit = 2): number {
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
