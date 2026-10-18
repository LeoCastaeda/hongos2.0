import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildPageMetadata,
  DEFAULT_OG_IMAGE,
  getSiteUrl,
  organizationJsonLd,
  SITE_NAME,
  websiteJsonLd,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const base = buildPageMetadata({
    locale,
    path: '',
    title: isEn
      ? 'Boulet Mushrooms – Functional mushroom extracts from Barcelona'
      : 'Boulet Mushrooms – Extractos de hongos funcionales desde Barcelona',
    description: isEn
      ? '100% locally sourced mushroom fruiting body double extracts. Boost your brain, beat fatigue, and support immunity with ultrasonic-assisted extraction (UAE).'
      : 'Extractos dobles de cuerpo fructífero de hongos 100% locales. Potencia tu mente, reduce la fatiga y refuerza tu inmunidad con extracción ultrasónica (UAE).',
    image: DEFAULT_OG_IMAGE,
  });

  return {
    ...base,
    metadataBase: new URL(getSiteUrl()),
    keywords: isEn
      ? [
          'functional mushrooms',
          'mushroom extracts',
          "Lion's Mane",
          'Reishi',
          'Cordyceps',
          'Barcelona',
          'double extract',
        ]
      : [
          'hongos funcionales',
          'extractos de hongos',
          'Melena de León',
          'Reishi',
          'Cordyceps',
          'Barcelona',
          'doble extracción',
        ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: DEFAULT_OG_IMAGE,
      apple: DEFAULT_OG_IMAGE,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          oswald.variable,
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [organizationJsonLd(), websiteJsonLd()],
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
