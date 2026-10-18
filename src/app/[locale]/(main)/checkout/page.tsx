import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutView } from './checkout-view';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: '/checkout',
    title: 'Checkout',
    description: 'Finaliza tu compra de forma segura.',
    noIndex: true,
  });
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto text-center py-20">
          <p>Cargando el carrito...</p>
        </div>
      }
    >
      <CheckoutView />
    </Suspense>
  );
}
