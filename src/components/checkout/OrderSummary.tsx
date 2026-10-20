'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { getProductImageUrl } from '@/lib/product-image';
import { useTranslations } from 'next-intl';

export function OrderSummary() {
  const t = useTranslations('Checkout');
  const {
    cartItems,
    cartSubtotal,
    cartTotal,
    shippingTotal,
    shippingLabel,
    needsShipping,
    hasCalculatedShipping,
    isSyncing,
  } = useCart();

  const shippingDisplay = (() => {
    if (!needsShipping) return t('shippingFree');
    if (!hasCalculatedShipping) return t('shippingPending');
    if (shippingTotal > 0) {
      const amount = `${shippingTotal.toFixed(2)}€`;
      return shippingLabel ? `${amount} · ${shippingLabel}` : amount;
    }
    return shippingLabel ? `${t('shippingFree')} · ${shippingLabel}` : t('shippingFree');
  })();

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        {cartItems.map((item) => {
          const imageUrl = getProductImageUrl(item.product);

          return (
            <div key={item.product.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={imageUrl}
                  alt={item.product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">{item.product.type}</p>
              </div>
              <p className="font-medium">
                {(item.product.price * item.quantity).toFixed(2)}€
              </p>
            </div>
          );
        })}
      </div>
      <Separator className="my-6" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-muted-foreground">{t('subtotal')}</p>
          <p className="font-medium">{cartSubtotal.toFixed(2)}€</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="text-muted-foreground">{t('shipping')}</p>
          <p
            className={`font-medium text-right ${isSyncing ? 'opacity-60' : ''}`}
          >
            {shippingDisplay}
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between font-bold text-lg">
        <p>{t('total')}</p>
        <p>{cartTotal.toFixed(2)}€</p>
      </div>
    </div>
  );
}
