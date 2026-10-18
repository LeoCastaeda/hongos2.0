/**
 * Redirecciones desde la web actual (WordPress/WooCommerce en bouletmushrooms.com)
 * hacia la app Next.js. Locale por defecto: es.
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const DEFAULT_LOCALE = 'es';

/** Slugs WooCommerce → slug nuevo (o null = catálogo) */
const PRODUCT_MAP: Record<string, string | null> = {
  'lions-mane-double-extract-30ml': 'lions-mane-tincture',
  'lions-mane-double-extract': 'lions-mane-tincture',
  'cordyceps-double-extract-30ml': 'cordyceps-tincture',
  'cordyceps-double-extract': 'cordyceps-tincture',
  'reishi-double-extract-30ml': 'reishi-tincture',
  'reishi-double-extract': 'reishi-tincture',
  'chaga-double-extract-30ml': 'chaga-tincture',
  'chaga-double-extract': 'chaga-tincture',
  'tremella-double-extract-30ml': 'tremella-tincture',
  'tremella-double-extract': 'tremella-tincture',
  'wellness-bundle': '3-product-bundle',
  // Productos retirados de la nueva tienda
  'adaptogenic-coffee': null,
  'mind-body-bundle': '3-product-bundle',
  'calm-defense-bundle': '3-product-bundle',
};

function withLocale(path: string, locale = DEFAULT_LOCALE) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

function productDestination(legacySlug: string) {
  const mapped = PRODUCT_MAP[legacySlug];
  if (mapped === undefined) {
    return withLocale('/collections/all');
  }
  if (mapped === null) {
    return withLocale('/collections/medicinal');
  }
  return withLocale(`/products/${mapped}`);
}

export function getLegacyRedirects(): LegacyRedirect[] {
  const redirects: LegacyRedirect[] = [
    // Páginas principales WP
    {
      source: '/shop',
      destination: withLocale('/collections/all'),
      permanent: true,
    },
    {
      source: '/shop/',
      destination: withLocale('/collections/all'),
      permanent: true,
    },
    {
      source: '/cart',
      destination: withLocale('/collections/all'),
      permanent: true,
    },
    {
      source: '/cart/',
      destination: withLocale('/collections/all'),
      permanent: true,
    },
    {
      source: '/checkout',
      destination: withLocale('/checkout'),
      permanent: true,
    },
    {
      source: '/checkout/',
      destination: withLocale('/checkout'),
      permanent: true,
    },
    {
      source: '/my-account',
      destination: withLocale('/contact'),
      permanent: true,
    },
    {
      source: '/my-account/:path*',
      destination: withLocale('/contact'),
      permanent: true,
    },
    {
      source: '/privacy-policy',
      destination: withLocale('/about'),
      permanent: false,
    },
    {
      source: '/privacy-policy/',
      destination: withLocale('/about'),
      permanent: false,
    },
    // Contacto WP ya coincide en path; forzar locale por si llega sin prefijo raro
    {
      source: '/contact-us',
      destination: withLocale('/contact'),
      permanent: true,
    },
  ];

  for (const slug of Object.keys(PRODUCT_MAP)) {
    redirects.push(
      {
        source: `/product/${slug}`,
        destination: productDestination(slug),
        permanent: true,
      },
      {
        source: `/product/${slug}/`,
        destination: productDestination(slug),
        permanent: true,
      }
    );
  }

  // Cualquier otro /product/* desconocido → catálogo (evita 404 de SEO antiguo)
  redirects.push({
    source: '/product/:slug*',
    destination: withLocale('/collections/all'),
    permanent: false,
  });

  return redirects;
}
