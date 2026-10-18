import type { MetadataRoute } from 'next';
import { articles, products } from '@/lib/data';
import { routing } from '@/i18n/routing';
import {
  absoluteUrl,
  COLLECTION_SLUGS,
  getSiteUrl,
  localizedPath,
  STATIC_PATHS,
} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }

    for (const slug of COLLECTION_SLUGS) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/collections/${slug}`)),
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/products/${product.slug}`)),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }

    for (const article of articles) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/learn/${article.slug}`)),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Ensure root resolves for crawlers that expect the bare domain
  entries.unshift({
    url: getSiteUrl(),
    lastModified,
    changeFrequency: 'weekly',
    priority: 1,
  });

  return entries;
}
