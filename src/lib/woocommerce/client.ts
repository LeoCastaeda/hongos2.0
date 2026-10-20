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
  searchParams?: Record<string, string | number | boolean | undefined>
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

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: authHeader(config),
      Accept: 'application/json',
    },
    next: { revalidate: 120, tags: ['woocommerce'] },
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
