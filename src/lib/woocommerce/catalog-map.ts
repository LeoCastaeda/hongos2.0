/**
 * Live WooCommerce catalog (bouletmushrooms.com) ↔ local enrichment keys.
 * Source: WP Admin product list (IDs, SKUs, prices).
 */
export type WooCatalogEntry = {
  wooId: number;
  sku: string | null;
  /** Typical WC permalink slugs */
  wooSlugs: string[];
  /** Slug used in Next routes, i18n `products.*`, and local data.tsx */
  localSlug: string;
  price: number;
};

export const WOO_CATALOG: WooCatalogEntry[] = [
  {
    wooId: 867,
    sku: null,
    wooSlugs: ['chaga-double-extract-30ml', 'chaga-double-extract'],
    localSlug: 'chaga-tincture',
    price: 27,
  },
  {
    wooId: 785,
    sku: 'TF-0001-112024',
    wooSlugs: ['tremella-double-extract-30ml', 'tremella-double-extract'],
    localSlug: 'tremella-tincture',
    price: 27,
  },
  {
    wooId: 753,
    sku: 'CM-0003-122024',
    wooSlugs: ['cordyceps-double-extract-30ml', 'cordyceps-double-extract'],
    localSlug: 'cordyceps-tincture',
    price: 27,
  },
  {
    wooId: 553,
    sku: null,
    wooSlugs: ['wellness-bundle'],
    localSlug: '3-product-bundle',
    price: 76,
  },
  {
    wooId: 475,
    sku: 'LM-0001-112023',
    wooSlugs: [
      'lions-mane-double-extract-30ml',
      'lions-mane-double-extract',
      'lion-s-mane-double-extract-30ml',
    ],
    localSlug: 'lions-mane-tincture',
    price: 27,
  },
  {
    wooId: 154,
    sku: 'GL-0001-112023',
    wooSlugs: ['reishi-double-extract-30ml', 'reishi-double-extract'],
    localSlug: 'reishi-tincture',
    price: 27,
  },
];

export function findCatalogEntry(input: {
  wooId?: number;
  slug?: string;
  sku?: string;
}): WooCatalogEntry | undefined {
  const { wooId, slug, sku } = input;
  if (wooId != null) {
    const byId = WOO_CATALOG.find((e) => e.wooId === wooId);
    if (byId) return byId;
  }
  if (sku) {
    const bySku = WOO_CATALOG.find(
      (e) => e.sku && e.sku.toLowerCase() === sku.toLowerCase()
    );
    if (bySku) return bySku;
  }
  if (slug) {
    const normalized = slug.toLowerCase();
    return WOO_CATALOG.find(
      (e) =>
        e.localSlug === normalized ||
        e.wooSlugs.some((s) => s.toLowerCase() === normalized)
    );
  }
  return undefined;
}
