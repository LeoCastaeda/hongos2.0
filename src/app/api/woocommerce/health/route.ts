import { NextResponse } from 'next/server';
import {
  getCatalogSource,
  isWooCommerceConfigured,
  pingWooCommerce,
} from '@/lib/woocommerce';
import { isWooStoreConfigured } from '@/lib/woocommerce/config';

/**
 * GET /api/woocommerce/health
 * Checks whether WC env vars are set and the REST API responds.
 * Never returns secret values — only which keys are present.
 */
export async function GET() {
  const present = {
    WC_BASE_URL: Boolean(process.env.WC_BASE_URL?.trim()),
    WC_CONSUMER_KEY: Boolean(process.env.WC_CONSUMER_KEY?.trim()),
    WC_CONSUMER_SECRET: Boolean(process.env.WC_CONSUMER_SECRET?.trim()),
    WC_PAYMENT_METHOD: Boolean(process.env.WC_PAYMENT_METHOD?.trim()),
    NEXT_PUBLIC_APP_URL: Boolean(process.env.NEXT_PUBLIC_APP_URL?.trim()),
  };
  const missing = Object.entries(present)
    .filter(([key, ok]) => !ok && key.startsWith('WC_') && key !== 'WC_PAYMENT_METHOD')
    .map(([key]) => key);

  const configured = isWooCommerceConfigured();
  const storeConfigured = isWooStoreConfigured();
  const source = getCatalogSource();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      storeConfigured: false,
      source,
      ok: false,
      present,
      missing,
      paymentMethod: process.env.WC_PAYMENT_METHOD?.trim() || null,
      message:
        missing.length > 0
          ? `Faltan en este entorno: ${missing.join(', ')}. Añádelas en Vercel → Settings → Environment Variables (Production) y haz Redeploy.`
          : 'Missing WC credentials. Using local catalog.',
    });
  }

  const ping = await pingWooCommerce();
  return NextResponse.json({
    configured: true,
    storeConfigured,
    source,
    ok: ping.ok,
    present,
    missing: [],
    paymentMethod: process.env.WC_PAYMENT_METHOD?.trim() || null,
    productSample: ping.productCount,
    error: ping.error,
    message: ping.ok
      ? 'WooCommerce API reachable. Catalog will prefer WC products.'
      : 'Credentials present but API call failed.',
  });
}
