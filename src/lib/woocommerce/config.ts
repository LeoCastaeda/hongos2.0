/**
 * WooCommerce connection settings (server-only).
 * Create keys in WP Admin → WooCommerce → Settings → Advanced → REST API.
 */
export type WooCommerceConfig = {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
};

function trimSlash(url: string) {
  return url.replace(/\/+$/, '');
}

export function getWooCommerceConfig(): WooCommerceConfig | null {
  const baseUrl = process.env.WC_BASE_URL?.trim();
  const consumerKey = process.env.WC_CONSUMER_KEY?.trim();
  const consumerSecret = process.env.WC_CONSUMER_SECRET?.trim();

  if (!baseUrl || !consumerKey || !consumerSecret) {
    return null;
  }

  return {
    baseUrl: trimSlash(baseUrl),
    consumerKey,
    consumerSecret,
  };
}

export function isWooCommerceConfigured(): boolean {
  return getWooCommerceConfig() !== null;
}

/** Base URL alone is enough for the public Store API (cart). */
export function getWooStoreBaseUrl(): string | null {
  const baseUrl = process.env.WC_BASE_URL?.trim();
  return baseUrl ? trimSlash(baseUrl) : null;
}

export function isWooStoreConfigured(): boolean {
  return getWooStoreBaseUrl() !== null && isWooCommerceConfigured();
}
