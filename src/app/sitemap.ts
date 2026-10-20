import type { MetadataRoute } from 'next';
import { articles, products } from '@/lib/data';
import { routing } from '@/i18n/routing';
import {
  absoluteUrl,
  COLLECTION_SLUGS,
  getPublicOrigin,
  localizedPath,
  STATIC_PATHS,
} from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getPublicOrigin();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path), origin),
        lastModified,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }

    for (const slug of COLLECTION_SLUGS) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/collections/${slug}`), origin),
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/products/${product.slug}`), origin),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }

    for (const article of articles) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, `/learn/${article.slug}`), origin),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  entries.unshift({
    url: origin,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1,
  });

  return entries;
}
