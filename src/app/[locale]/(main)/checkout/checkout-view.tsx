'use client';

import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export function CheckoutView() {
  const t = useTranslations('Checkout');
  const { cartItems, isCartReady } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled') === '1';

  useEffect(() => {
    if (isCartReady && cartItems.length === 0) {
      router.replace('/collections/all');
    }
  }, [isCartReady, cartItems, router]);

  if (!isCartReady) {
    return (
      <div className="container mx-auto text-center py-20">
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <p>{t('emptyRedirect')}</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          {t('title')}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6">
              {t('shippingPayment')}
            </h2>
            {cancelled && (
              <p className="mb-4 text-sm text-muted-foreground">{t('cancelled')}</p>
            )}
            <CheckoutForm />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6">
              {t('orderSummary')}
            </h2>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
