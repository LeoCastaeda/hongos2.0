import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata, faqJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Faq' });
  return buildPageMetadata({
    locale,
    path: '/faq',
    title: t('metaTitle'),
    description: t('metaDesc'),
  });
}

export default async function FaqPage() {
  const t = await getTranslations('Faq');
  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t(`q${n}`),
    answer: t(`a${n}`),
  }));

  return (
    <div className="container mx-auto max-w-3xl py-16">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{t('subtitle')}</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
