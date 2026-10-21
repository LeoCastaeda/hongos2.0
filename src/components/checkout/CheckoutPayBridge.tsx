'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, Lock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ClearCart } from '@/components/checkout/ClearCart';

export function CheckoutPayBridge() {
  const t = useTranslations('Checkout');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(2);

  const payUrl = searchParams.get('pay_url') || '';
  const orderId = searchParams.get('order_id') || '';
  const safePayUrl = useMemo(() => {
    try {
      const url = new URL(payUrl);
      if (!url.hostname.endsWith('bouletmushrooms.com')) return '';
      return url.toString();
    } catch {
      return '';
    }
  }, [payUrl]);

  useEffect(() => {
    if (!safePayUrl) return;
    if (seconds <= 0) {
      window.location.href = safePayUrl;
      return;
    }
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [safePayUrl, seconds]);

  if (!safePayUrl) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-headline text-3xl mb-4">{t('payBridgeErrorTitle')}</h1>
        <p className="text-muted-foreground mb-8">{t('payBridgeErrorBody')}</p>
        <Button asChild>
          <Link href="/checkout">{t('continuePay')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-[#0A0A0A] text-white">
      <ClearCart />
      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/20">
          <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
        </div>
        <p className="font-headline text-xs uppercase tracking-[0.25em] text-white/60 mb-3">
          Boulet
        </p>
        <h1 className="font-headline text-3xl sm:text-4xl mb-3">
          {t('payBridgeTitle')}
        </h1>
        <p className="text-white/70 leading-relaxed mb-2">{t('payBridgeBody')}</p>
        {orderId ? (
          <p className="text-sm text-white/50 mb-8">
            {t('payBridgeOrder', { id: orderId })}
          </p>
        ) : (
          <div className="mb-8" />
        )}

        <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {t('payBridgeRedirect', { seconds })}
        </div>

        <Button
          size="lg"
          className="min-w-[14rem]"
          onClick={() => {
            window.location.href = safePayUrl;
          }}
        >
          {t('payBridgeCta')}
        </Button>

        <p className="mt-8 text-xs text-white/40 max-w-sm leading-relaxed">
          {t('payBridgeNote')}
        </p>

        <Button
          asChild
          variant="link"
          className="mt-4 text-white/50 hover:text-white"
        >
          <Link href="/">{locale === 'en' ? 'Home' : 'Inicio'}</Link>
        </Button>
      </div>
    </div>
  );
}
