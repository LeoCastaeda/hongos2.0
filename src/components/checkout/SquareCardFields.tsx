'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import {
  getSquareApplicationId,
  getSquareLocationId,
} from '@/lib/square/config';
import type {
  SquareBillingContact,
  SquareCard,
  SquarePayments,
  SquareTokenizeResult,
} from '@/lib/square/types';

const SQUARE_SCRIPT = 'https://web.squarecdn.com/v1/square.js';

export type SquareCardHandle = {
  tokenize: (input: {
    amount: string;
    currencyCode?: string;
    billingContact: SquareBillingContact;
  }) => Promise<{
    nonce: string;
    cardType?: string;
    lastFour?: string;
    expMonth?: string;
    expYear?: string;
    postalCode?: string;
    buyerVerificationToken?: string;
  }>;
};

type Props = {
  onReadyChange?: (ready: boolean) => void;
};

function loadSquareScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.Square) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SQUARE_SCRIPT}"]`
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Square) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Square script failed'))
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SQUARE_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Square script failed'));
    document.head.appendChild(script);
  });
}

export const SquareCardFields = forwardRef<SquareCardHandle, Props>(
  function SquareCardFields({ onReadyChange }, ref) {
    const t = useTranslations('Checkout');
    const containerId = useRef(
      `square-card-${Math.random().toString(36).slice(2, 9)}`
    ).current;
    const paymentsRef = useRef<SquarePayments | null>(null);
    const cardRef = useRef<SquareCard | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      onReadyChange?.(ready);
    }, [onReadyChange, ready]);

    useEffect(() => {
      let cancelled = false;

      async function init() {
        const appId = getSquareApplicationId();
        const locationId = getSquareLocationId();
        if (!appId || !locationId) {
          setError(t('squareNotConfigured'));
          return;
        }

        try {
          await loadSquareScript();
          if (cancelled || !window.Square) {
            throw new Error('Square SDK unavailable');
          }

          const payments = await window.Square.payments(appId, locationId);
          const card = await payments.card();
          await card.attach(`#${containerId}`);

          if (cancelled) {
            await card.destroy().catch(() => undefined);
            return;
          }

          paymentsRef.current = payments;
          cardRef.current = card;
          setReady(true);
          setError(null);
        } catch (err) {
          console.error('[square] init failed', err);
          if (!cancelled) {
            setError(t('squareInitError'));
            setReady(false);
          }
        }
      }

      void init();

      return () => {
        cancelled = true;
        const card = cardRef.current;
        cardRef.current = null;
        paymentsRef.current = null;
        void card?.destroy().catch(() => undefined);
      };
    }, [containerId, t]);

    const tokenize = useCallback<SquareCardHandle['tokenize']>(
      async ({ amount, currencyCode = 'EUR', billingContact }) => {
        const payments = paymentsRef.current;
        const card = cardRef.current;
        if (!payments || !card) {
          throw new Error(t('squareNotReady'));
        }

        const result: SquareTokenizeResult = await card.tokenize();
        if (result.status !== 'OK' || !result.token) {
          const message =
            result.errors?.[0]?.message || t('squareTokenError');
          throw new Error(message);
        }

        let buyerVerificationToken: string | undefined;
        try {
          const verification = await payments.verifyBuyer(result.token, {
            amount,
            currencyCode,
            intent: 'CHARGE',
            customerInitiated: true,
            sellerKeyedIn: false,
            billingContact,
          });
          buyerVerificationToken = verification.token;
        } catch (err) {
          // Some cards / regions skip SCA; continue with the nonce alone.
          console.warn('[square] verifyBuyer skipped/failed', err);
        }

        const cardInfo = result.details?.card;
        return {
          nonce: result.token,
          cardType: cardInfo?.brand || 'CARD',
          lastFour: cardInfo?.last4 || '0000',
          expMonth: cardInfo?.expMonth
            ? String(cardInfo.expMonth).padStart(2, '0')
            : undefined,
          expYear: cardInfo?.expYear
            ? String(cardInfo.expYear)
            : undefined,
          postalCode:
            result.details?.billing?.postalCode ||
            billingContact.postalCode ||
            '',
          buyerVerificationToken,
        };
      },
      [t]
    );

    useImperativeHandle(ref, () => ({ tokenize }), [tokenize]);

    return (
      <div className="space-y-2">
        <div
          id={containerId}
          className="min-h-[56px] rounded-md border border-input bg-background px-3 py-3"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!error && !ready && (
          <p className="text-sm text-muted-foreground">{t('squareLoading')}</p>
        )}
      </div>
    );
  }
);
