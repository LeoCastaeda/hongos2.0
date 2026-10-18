import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Shipping' });
  return buildPageMetadata({
    locale,
    path: '/shipping',
    title: t('metaTitle'),
    description: t('metaDesc'),
  });
}

export default async function ShippingPage() {
  const t = await getTranslations('Shipping');

  return (
    <div className="container mx-auto max-w-3xl py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{t('subtitle')}</p>
      </div>
      <div className="prose lg:prose-xl max-w-none mx-auto">
        <h2>{t('shippingTitle')}</h2>
        <p>{t('shippingP1')}</p>
        <ul>
          <li>
            <strong>{t('standard')}</strong>
          </li>
          <li>
            <strong>{t('express')}</strong>
          </li>
        </ul>
        <p>{t('shippingP2')}</p>

        <h2>{t('returnsTitle')}</h2>
        <p>{t('returnsP1')}</p>
        <p>
          {t.rich('returnsP2', {
            email: () => (
              <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
            ),
          })}
        </p>
        <p>{t('returnsP3')}</p>
      </div>
    </div>
  );
}
