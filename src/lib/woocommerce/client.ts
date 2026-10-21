import { getWooCommerceConfig, type WooCommerceConfig } from './config';
import type { WooProduct } from './types';

export class WooCommerceError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'WooCommerceError';
    this.status = status;
  }
}

function authHeader(config: WooCommerceConfig) {
  const token = Buffer.from(
    `${config.consumerKey}:${config.consumerSecret}`
  ).toString('base64');
  return `Basic ${token}`;
}

async function wooFetch<T>(
  path: string,
  searchParams?: Record<string, string | number | boolean | undefined>,
  options?: { method?: string; body?: unknown; cache?: RequestCache }
): Promise<T> {
  const config = getWooCommerceConfig();
  if (!config) {
    throw new WooCommerceError('WooCommerce is not configured', 503);
  }

  const url = new URL(`${config.baseUrl}/wp-json/wc/v3${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }

  const method = options?.method ?? 'GET';
  const response = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: authHeader(config),
      Accept: 'application/json',
      ...(options?.body !== undefined
        ? { 'Content-Type': 'application/json' }
        : {}),
    },
    body:
      options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: options?.cache ?? (method === 'GET' ? undefined : 'no-store'),
    ...(method === 'GET' ? { next: { revalidate: 120, tags: ['woocommerce'] } } : {}),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new WooCommerceError(
      `WooCommerce API ${response.status}: ${body.slice(0, 200)}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchWooProducts(params?: {
  page?: number;
  perPage?: number;
  status?: string;
}): Promise<WooProduct[]> {
  return wooFetch<WooProduct[]>('/products', {
    page: params?.page ?? 1,
    per_page: params?.perPage ?? 50,
    status: params?.status ?? 'publish',
  });
}

export async function fetchWooProductBySlug(
  slug: string
): Promise<WooProduct | null> {
  const list = await wooFetch<WooProduct[]>('/products', {
    slug,
    status: 'publish',
    per_page: 1,
  });
  return list[0] ?? null;
}

export async function pingWooCommerce(): Promise<{
  ok: boolean;
  productCount?: number;
  error?: string;
}> {
  try {
    const products = await fetchWooProducts({ perPage: 1, page: 1 });
    return { ok: true, productCount: products.length };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export type WooPaymentGateway = {
  id: string;
  title?: string;
  enabled?: boolean | string;
};

/** Enabled gateways from authenticated REST API (classic + Store). */
export async function fetchEnabledPaymentGateways(): Promise<string[]> {
  const gateways = await wooFetch<WooPaymentGateway[]>('/payment_gateways');
  return gateways
    .filter((g) => g.enabled === true || g.enabled === 'yes')
    .map((g) => g.id)
    .filter(Boolean);
}

export type WooCreatedOrder = {
  id: number;
  order_key: string;
  status: string;
  payment_url?: string;
};

/** Create a pending order (needs API key with Write permission). */
export async function createWooOrder(body: unknown): Promise<WooCreatedOrder> {
  return wooFetch<WooCreatedOrder>('/orders', undefined, {
    method: 'POST',
    body,
    cache: 'no-store',
  });
}

export function getWooOrderPayUrl(orderId: number, orderKey: string): string {
  const config = getWooCommerceConfig();
  if (!config) {
    throw new WooCommerceError('WooCommerce is not configured', 503);
  }
  return `${config.baseUrl}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${encodeURIComponent(orderKey)}`;
}
