import { products as localProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { findCatalogEntry } from './catalog-map';
import { isWooCommerceConfigured } from './config';
import { fetchWooProductBySlug, fetchWooProducts } from './client';
import { mapWooProductToProduct } from './mapper';

function withLocalSource(products: Product[]): Product[] {
  return products.map((p) => {
    const entry = findCatalogEntry({ slug: p.slug });
    return {
      ...p,
      wooId: p.wooId ?? entry?.wooId,
      source: p.source ?? 'local',
      inStock: p.inStock ?? true,
    };
  });
}

/**
 * Returns the storefront catalog.
 * Uses WooCommerce when env credentials are set; otherwise falls back to local data.
 */
export async function getCatalogProducts(): Promise<Product[]> {
  if (!isWooCommerceConfigured()) {
    return withLocalSource(localProducts);
  }

  try {
    const wooProducts = await fetchWooProducts({ perPage: 100 });
    if (wooProducts.length === 0) {
      console.warn('[woocommerce] API returned 0 products; using local catalog');
      return withLocalSource(localProducts);
    }
    return wooProducts.map(mapWooProductToProduct);
  } catch (error) {
    console.error('[woocommerce] Failed to load products; using local catalog', error);
    return withLocalSource(localProducts);
  }
}

export async function getCatalogProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (!isWooCommerceConfigured()) {
    return withLocalSource(localProducts).find((p) => p.slug === slug);
  }

  const entry = findCatalogEntry({ slug });
  const slugCandidates = Array.from(
    new Set([
      slug,
      ...(entry?.wooSlugs ?? []),
      ...(entry ? [entry.localSlug] : []),
    ])
  );

  try {
    for (const candidate of slugCandidates) {
      const woo = await fetchWooProductBySlug(candidate);
      if (woo) return mapWooProductToProduct(woo);
    }
  } catch (error) {
    console.error(`[woocommerce] Failed to load product "${slug}"`, error);
  }

  return withLocalSource(localProducts).find((p) => p.slug === slug);
}

export function getCatalogSource(): 'woocommerce' | 'local' {
  return isWooCommerceConfigured() ? 'woocommerce' : 'local';
}
