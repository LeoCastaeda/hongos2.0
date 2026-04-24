import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Boulet Mushrooms – Slowly extracted functional mushrooms from Barcelona',
  description: '100% locally sourced mushroom fruiting body double extracts. Boost your brain, beat fatigue, and supercharge your immunity with functional mushrooms extracted using ultrasonic-assisted extraction (UAE) technology.',
  keywords: ['functional mushrooms', 'mushroom extracts', 'Lion\'s Mane', 'Reishi', 'Cordyceps', 'Turkey Tail', 'Barcelona', 'UAE extraction', 'double extract', 'adaptogenic'],
  authors: [{ name: 'Boulet Mushrooms' }],
  creator: 'Boulet Mushrooms',
  publisher: 'Boulet Mushrooms',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bouletmushrooms.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Boulet Mushrooms – Slowly extracted functional mushrooms from Barcelona',
    description: '100% locally sourced mushroom fruiting body double extracts. Boost your brain, beat fatigue, and supercharge your immunity.',
    url: 'https://bouletmushrooms.com',
    siteName: 'Boulet Mushrooms',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boulet Mushrooms – Slowly extracted functional mushrooms from Barcelona',
    description: '100% locally sourced mushroom fruiting body double extracts.',
    creator: '@bouletmushrooms',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <FirebaseClientProvider>
          <CartProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
