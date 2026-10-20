import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { articles, benefits, products } from '@/lib/data';
import type { Product } from '@/lib/types';

export const SITE_NAME = 'Boulet Mushrooms';
export const DEFAULT_OG_IMAGE = '/images/boulet_mushrooms_cover.jpg';

const FALLBACK_SITE_URL = 'https://bouletmushrooms.com';

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  return fromEnv || FALLBACK_SITE_URL;
}

export function absoluteUrl(path = '/') {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function localizedPath(locale: string, path = '') {
  const clean = path === '/' ? '' : path.replace(/^\//, '');
  const suffix = clean ? `/${clean}` : '';
  return `/${locale}${suffix}`;
}

export function languageAlternates(path = '') {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, path));
  }
  languages['x-default'] = absoluteUrl(
    localizedPath(routing.defaultLocale, path)
  );
  return languages;
}

export function pageAlternates(locale: string, path = '') {
  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages: languageAlternates(path),
  };
}

export function resolveImageUrl(imageIdOrUrl?: string | null) {
  if (!imageIdOrUrl) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (imageIdOrUrl.startsWith('http://') || imageIdOrUrl.startsWith('https://')) {
    return imageIdOrUrl;
  }
  if (imageIdOrUrl.startsWith('/')) {
    return absoluteUrl(imageIdOrUrl);
  }
  const placeholder = PlaceHolderImages.find((img) => img.id === imageIdOrUrl);
  if (!placeholder?.imageUrl) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (placeholder.imageUrl.startsWith('http')) return placeholder.imageUrl;
  return absoluteUrl(placeholder.imageUrl);
}

type BuildMetadataInput = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  type = 'website',
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImage = resolveImageUrl(image);
  const url = absoluteUrl(localizedPath(locale, path));
  const ogLocale = locale === 'en' ? 'en_US' : 'es_ES';

  return {
    title: fullTitle,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@bouletmushrooms',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export function getCollectionContent(
  slug: string,
  catalog: Product[] = products
) {
  const benefit = benefits.find((b) => b.slug === slug);

  let filteredProducts = catalog;
  let title = 'Nuestros Productos';
  let description = 'Explora nuestra gama completa de suplementos naturales de hongos funcionales.';

  if (slug === 'all') {
    filteredProducts = catalog;
  } else if (slug === 'bundles') {
    filteredProducts = catalog.filter((p) => p.type === 'bundle');
    title = 'Packs y Bundles';
    description = 'Ahorra con nuestros packs predefinidos para objetivos específicos.';
  } else if (slug === 'tinctures') {
    filteredProducts = catalog.filter((p) => p.type === 'tincture');
    title = 'Todas las Tinturas';
    description = 'Descubre nuestra colección de tinturas de hongos funcionales de doble extracción.';
  } else if (slug === 'medicinal') {
    filteredProducts = catalog.filter((p) => p.category === 'Medicinal');
    title = 'Hongos Medicinales';
    description = 'Extractos y packs centrados en los beneficios para la salud.';
  } else if (slug === 'comestible') {
    filteredProducts = catalog.filter((p) => p.category === 'Comestible');
    title = 'Productos Comestibles';
    description = 'Disfruta de los beneficios de los hongos en tu día a día.';
  } else if (benefit) {
    filteredProducts = catalog.filter(
      (p) =>
        p.benefitCategory === slug ||
        (p.type === 'bundle' && p.slug.includes(slug))
    );
    title = `Productos para ${benefit.name}`;
    description = benefit.description;
  }

  return { filteredProducts, title, description, benefit };
}

export const COLLECTION_SLUGS = [
  'all',
  'bundles',
  'tinctures',
  'medicinal',
  ...benefits.map((b) => b.slug),
] as const;

export const STATIC_PATHS = [
  '',
  '/about',
  '/learn',
  '/faq',
  '/contact',
  '/shipping',
  '/quiz',
  '/collections',
] as const;

export function productJsonLd(product: Product, locale: string) {
  const image = product.imageUrl
    ? product.imageUrl
    : resolveImageUrl(product.image);
  const url = absoluteUrl(localizedPath(locale, `/products/${product.slug}`));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      'Extractos dobles de hongos funcionales de cuerpo fructífero, elaborados en Barcelona.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressCountry: 'ES',
    },
    sameAs: ['https://www.instagram.com/bouletmushrooms'],
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getSiteUrl(),
    inLanguage: ['es', 'en'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

export function articleJsonLd(
  article: (typeof articles)[number],
  locale: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.content,
    image: resolveImageUrl(article.image),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    mainEntityOfPage: absoluteUrl(
      localizedPath(locale, `/learn/${article.slug}`)
    ),
    inLanguage: locale,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
