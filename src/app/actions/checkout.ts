'use server';

/**
 * @deprecated El checkout demo (Prisma + Stripe) quedó sustituido por
 * `POST /api/checkout` (WooCommerce Store API).
 * Este archivo se mantiene solo para no romper imports antiguos.
 */
export async function createCheckoutSession() {
  return {
    error:
      'El checkout demo de Stripe ya no está activo. Usa el flujo WooCommerce (/api/checkout).',
  };
}
