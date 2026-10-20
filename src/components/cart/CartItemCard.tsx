'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import type { CartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { getProductImageUrl } from '@/lib/product-image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const t = useTranslations('Cart');
  const { updateQuantity, removeFromCart, isSyncing } = useCart();
  const imageUrl = getProductImageUrl(item.product);
  const price = item.product.price;
  const lineTotal = price * item.quantity;

  return (
    <article className="group flex gap-3 sm:gap-4">
      <SheetClose asChild>
        <Link
          href={`/products/${item.product.slug}`}
          className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden bg-muted ring-1 ring-border transition-opacity hover:opacity-90"
        >
          <Image
            src={imageUrl}
            alt={item.product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </Link>
      </SheetClose>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-0.5">
            <SheetClose asChild>
              <Link
                href={`/products/${item.product.slug}`}
                className="block font-semibold leading-snug hover:text-primary transition-colors line-clamp-2"
              >
                {item.product.name}
              </Link>
            </SheetClose>
            <p className="text-sm text-muted-foreground">
              {t('unitPrice', { price: price.toFixed(2) })}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            disabled={isSyncing}
            onClick={() => void removeFromCart(item.product.id)}
            aria-label={t('remove', { name: item.product.name })}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div
            className="inline-flex items-center border border-border bg-background"
            role="group"
            aria-label={t('quantity')}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              disabled={isSyncing || item.quantity <= 1}
              onClick={() =>
                void updateQuantity(item.product.id, item.quantity - 1)
              }
              aria-label={t('decrease')}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span
              className="w-9 text-center text-sm font-medium tabular-nums"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              disabled={isSyncing || item.quantity >= 20}
              onClick={() =>
                void updateQuantity(item.product.id, item.quantity + 1)
              }
              aria-label={t('increase')}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="font-semibold tabular-nums">
            {lineTotal.toFixed(2)}€
          </p>
        </div>
      </div>
    </article>
  );
}
