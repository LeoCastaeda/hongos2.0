import { NextResponse } from 'next/server';
import {
  getCatalogSource,
  isWooCommerceConfigured,
  pingWooCommerce,
} from '@/lib/woocommerce';

/**
 * GET /api/woocommerce/health
 * Checks whether WC env vars are set and the REST API responds.
 */
export async function GET() {
  const configured = isWooCommerceConfigured();
  const source = getCatalogSource();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      source,
      ok: false,
      message:
        'Missing WC_BASE_URL, WC_CONSUMER_KEY or WC_CONSUMER_SECRET. Using local catalog.',
    });
  }

  const ping = await pingWooCommerce();
  return NextResponse.json({
    configured: true,
    source,
    ok: ping.ok,
    productSample: ping.productCount,
    error: ping.error,
    message: ping.ok
      ? 'WooCommerce API reachable. Catalog will prefer WC products.'
      : 'Credentials present but API call failed.',
  });
}
