import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildPageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ContactPage() {
  const t = await getTranslations('Contact');

  return (
    <div className="container mx-auto max-w-2xl py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
          <p className="pt-4 text-sm text-muted-foreground">
            {t('orEmail')}{' '}
            <a
              href={CONTACT_MAILTO}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
