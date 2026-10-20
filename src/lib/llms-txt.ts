import { products } from '@/lib/data';
import { absoluteUrl, getSiteUrl, SITE_NAME } from '@/lib/seo';

/**
 * Generative Engine Optimization (GEO) content for AI crawlers.
 * Spec-inspired: https://llmstxt.org/
 */
export function buildLlmsTxt(): string {
  const site = getSiteUrl();

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> Extractos dobles de hongos funcionales 100% cuerpo fructífero, elaborados en Barcelona (España). Marca: Boulet. Envíos a España e Italia.`,
    '',
    `Sitio: ${site}`,
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
      const url = absoluteUrl(`/es/products/${p.slug}`);
      return `- [${p.name}](${url}): ${p.description} Precio orientativo ${p.price.toFixed(2)} EUR.`;
    }),
    '',
    '## Páginas clave',
    '',
    `- [Inicio ES](${absoluteUrl('/es')}): propuesta de valor y bestsellers`,
    `- [Inicio EN](${absoluteUrl('/en')}): value proposition and bestsellers`,
    `- [Tienda](${absoluteUrl('/es/collections/all')}): catálogo completo`,
    `- [Nosotros](${absoluteUrl('/es/about')}): historia, método UAE, garantías`,
    `- [Aprender](${absoluteUrl('/es/learn')}): guías y ciencia`,
    `- [FAQ](${absoluteUrl('/es/faq')}): preguntas frecuentes`,
    `- [Envíos](${absoluteUrl('/es/shipping')}): política de envíos y devoluciones`,
    `- [Quiz](${absoluteUrl('/es/quiz')}): recomendación de stack personalizado`,
    `- [Contacto](${absoluteUrl('/es/contact')})`,
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
    `- [llms-full.txt](${absoluteUrl('/llms-full.txt')}): versión ampliada con FAQs de producto`,
    `- [sitemap.xml](${absoluteUrl('/sitemap.xml')})`,
    '',
  ];

  return lines.join('\n');
}

export function buildLlmsFullTxt(): string {
  const base = buildLlmsTxt();
  const faqBlocks = products.flatMap((p) => {
    if (!p.faqs?.length) return [];
    return [
      '',
      `### ${p.name}`,
      `URL: ${absoluteUrl(`/es/products/${p.slug}`)}`,
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
