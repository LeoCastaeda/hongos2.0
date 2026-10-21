/** Public Square Web Payments config (browser-safe). */

export function getSquareApplicationId(): string | null {
  return process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID?.trim() || null;
}

export function getSquareLocationId(): string | null {
  return process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.trim() || null;
}

/** True when Next can embed the Square card form (no WP order-pay jump). */
export function isSquareEmbeddedConfigured(): boolean {
  return Boolean(getSquareApplicationId() && getSquareLocationId());
}

export function getSquareEnvironment(): 'sandbox' | 'production' {
  const appId = getSquareApplicationId() || '';
  if (appId.startsWith('sandbox-')) return 'sandbox';
  return 'production';
}
