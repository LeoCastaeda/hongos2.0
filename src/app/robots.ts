import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/checkout', '/*/checkout/'],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
