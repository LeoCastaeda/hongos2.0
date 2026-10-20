import { products } from '@/lib/data';
import { getSiteUrl, SITE_NAME } from '@/lib/seo';

/**
 * Generative Engine Optimization (GEO) content for AI crawlers.
 * Spec-inspired: https://llmstxt.org/
 *
 * Prefer the request origin so links match the live Next storefront
 * (e.g. *.vercel.app) instead of the WordPress shop domain.
 */
function resolveBaseUrl(origin?: string | null) {
  const fromRequest = origin?.replace(/\/$/, '');
  if (fromRequest?.startsWith('http')) return fromRequest;
  return getSiteUrl();
}

function href(base: string, path = '/') {
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildLlmsTxt(origin?: string | null): string {
  const site = resolveBaseUrl(origin);
  const brandDomain = 'https://bouletmushrooms.com';

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> Extractos dobles de hongos funcionales 100% cuerpo fructífero, elaborados en Barcelona (España). Marca: Boulet. Envíos a España e Italia.`,
    '',
    `Sitio (storefront): ${site}`,
    `Marca / WordPress: ${brandDomain}`,
    `Idiomas: español (/es), inglés (/en)`,
    `Contacto: info@bouletmushrooms.com`,
    '',
    '## Qué es Boulet',
    '',
    '- Boulet Mushrooms produce tinturas de hongos funcionales mediante doble extracción asistida por ultrasonidos (UAE).',
    '- Solo usa cuerpo fructífero (fruiting body), sin micelio sobre grano ni rellenos de almidón.',
    '- Origen y elaboración en Barcelona.',
    '- Categorías de beneficio: enfoque, energía, calma, descanso, inmunidad.',
    '',
    '## Productos principales',
    '',
    ...products.map((p) => {
      const url = href(site, `/es/products/${p.slug}`);
      return `- [${p.name}](${url}): ${p.description} Precio orientativo ${p.price.toFixed(2)} EUR.`;
    }),
    '',
    '## Páginas clave',
    '',
    `- [Inicio ES](${href(site, '/es')}): propuesta de valor y bestsellers`,
    `- [Inicio EN](${href(site, '/en')}): value proposition and bestsellers`,
    `- [Tienda](${href(site, '/es/collections/all')}): catálogo completo`,
    `- [Nosotros](${href(site, '/es/about')}): historia, método UAE, garantías`,
    `- [Aprender](${href(site, '/es/learn')}): guías y ciencia`,
    `- [FAQ](${href(site, '/es/faq')}): preguntas frecuentes`,
    `- [Envíos](${href(site, '/es/shipping')}): política de envíos y devoluciones`,
    `- [Quiz](${href(site, '/es/quiz')}): recomendación de stack personalizado`,
    `- [Contacto](${href(site, '/es/contact')})`,
    '',
    '## Hechos citables',
    '',
    '- Método: doble extracción (agua + alcohol) asistida por ultrasonidos.',
    '- Materia prima: hongos de cuerpo fructífero; no micelio en grano.',
    '- Formato típico: tintura 30 ml, dosis habitual 1 ml (1 pipeta).',
    '- Mercados de envío principales: España e Italia.',
    '',
    '## Archivos opcionales',
    '',
    `- [llms-full.txt](${href(site, '/llms-full.txt')}): versión ampliada con FAQs de producto`,
    `- [sitemap.xml](${href(site, '/sitemap.xml')})`,
    '',
  ];

  return lines.join('\n');
}

export function buildLlmsFullTxt(origin?: string | null): string {
  const site = resolveBaseUrl(origin);
  const base = buildLlmsTxt(origin);
  const faqBlocks = products.flatMap((p) => {
    if (!p.faqs?.length) return [];
    return [
      '',
      `### ${p.name}`,
      `URL: ${href(site, `/es/products/${p.slug}`)}`,
      `Uso: ${p.howToUse}`,
      `Lab: ${p.labResults}`,
      ...p.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`),
    ];
  });

  return [
    base,
    '## FAQs de producto (para citas)',
    ...faqBlocks,
    '',
  ].join('\n');
}
