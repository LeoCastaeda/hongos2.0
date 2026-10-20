import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

/** AI / answer-engine crawlers — keep allowed for Generative Engine Optimization (GEO). */
const AI_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'GoogleOther',
  'ClaudeBot',
  'Anthropic-AI',
  'PerplexityBot',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'meta-externalagent',
] as const;

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  const disallowCheckout = ['/*/checkout', '/*/checkout/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowCheckout,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: disallowCheckout,
      })),
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
