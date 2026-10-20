import { products as localProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { findCatalogEntry } from './catalog-map';
import type { WooProduct } from './types';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePrice(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function inferType(woo: WooProduct): Product['type'] {
  const haystack = [
    woo.type,
    woo.slug,
    ...woo.categories.map((c) => c.slug),
    ...woo.tags.map((t) => t.slug),
  ]
    .join(' ')
    .toLowerCase();

  if (haystack.includes('bundle') || haystack.includes('pack')) {
    return 'bundle';
  }
  if (haystack.includes('coffee') || haystack.includes('cafe')) {
    return 'coffee';
  }
  return 'tincture';
}

function inferBenefitCategory(woo: WooProduct, local?: Product): string {
  if (local?.benefitCategory) return local.benefitCategory;

  const tags = woo.tags.map((t) => t.slug.toLowerCase());
  const match = ['focus', 'energy', 'calm', 'rest', 'immunity'].find((slug) =>
    tags.includes(slug)
  );
  return match ?? 'immunity';
}

/**
 * Maps a WooCommerce product into our storefront Product shape.
 * Matches live WC IDs/SKUs/slugs to local enrichment (i18n, habitat, FAQs).
 */
export function mapWooProductToProduct(woo: WooProduct): Product {
  const entry = findCatalogEntry({
    wooId: woo.id,
    slug: woo.slug,
    sku: woo.sku,
  });
  const local = localProducts.find(
    (p) => p.slug === (entry?.localSlug ?? woo.slug)
  );
  const description =
    stripHtml(woo.short_description) ||
    stripHtml(woo.description) ||
    local?.description ||
    '';

  return {
    id: `woo-${woo.id}`,
    wooId: woo.id,
    name: local?.name || woo.name || woo.slug,
    // Keep Next.js routes + messages keyed by localSlug when known
    slug: entry?.localSlug ?? local?.slug ?? woo.slug,
    price:
      parsePrice(woo.price || woo.sale_price || woo.regular_price) ||
      entry?.price ||
      local?.price ||
      0,
    description,
    benefits: local?.benefits ?? [],
    howToUse: local?.howToUse ?? '',
    labResults: local?.labResults ?? '',
    faqs: local?.faqs ?? [],
    image: local?.image ?? '',
    imageUrl: woo.images[0]?.src || local?.imageUrl,
    type: local?.type ?? inferType(woo),
    category: local?.category ?? 'Medicinal',
    benefitCategory: inferBenefitCategory(woo, local),
    isBestSeller: local?.isBestSeller,
    inStock: woo.stock_status === 'instock',
    source: 'woocommerce',
  };
}
