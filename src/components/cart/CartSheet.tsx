'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useCart } from '@/context/CartContext';
import { CartItemCard } from './CartItemCard';
import { ScrollArea } from '../ui/scroll-area';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Loader2, ShoppingBag } from 'lucide-react';

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const t = useTranslations('Cart');
  const {
    cartItems,
    cartSubtotal,
    shippingTotal,
    hasCalculatedShipping,
    isSyncing,
    isCartOpen,
    setCartOpen,
  } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasItems = cartItems.length > 0;

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="space-y-1 border-b px-6 py-5 text-left">
          <SheetTitle className="font-headline text-xl tracking-wide">
            {t('title', { count: itemCount })}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t('description')}
          </SheetDescription>
          {isSyncing && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              {t('updating')}
            </p>
          )}
        </SheetHeader>

        {hasItems ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <ul className="flex flex-col divide-y divide-border py-2">
                {cartItems.map((item) => (
                  <li key={item.product.id} className="py-4 first:pt-2 last:pb-2">
                    <CartItemCard item={item} />
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <SheetFooter className="mt-auto relative block space-y-0 p-0 sm:flex-col sm:space-x-0">
              <div className="relative overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-hidden
                >
                  <source src="/videos/abajo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/70" aria-hidden />
                <div className="relative z-10 space-y-4 px-6 py-5 text-white">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-sm uppercase tracking-widest text-white/70">
                        {t('subtotal')}
                      </p>
                      <p className="font-headline text-2xl tabular-nums">
                        {cartSubtotal.toFixed(2)}€
                      </p>
                    </div>
                    {hasCalculatedShipping && shippingTotal > 0 ? (
                      <p className="text-sm text-white/75">
                        {t('shippingAmount', {
                          amount: shippingTotal.toFixed(2),
                        })}
                      </p>
                    ) : (
                      <p className="text-sm text-white/75">{t('shippingNote')}</p>
                    )}
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="space-y-2">
                    {isSyncing ? (
                      <Button className="w-full" size="lg" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('updating')}
                      </Button>
                    ) : (
                      <SheetClose asChild>
                        <Button className="w-full" size="lg" asChild>
                          <Link href="/checkout">{t('checkout')}</Link>
                        </Button>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10 hover:text-white"
                      >
                        <Link href="/collections/all">{t('continue')}</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center border border-border bg-muted/40">
              <ShoppingBag
                className="h-7 w-7 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div className="space-y-2">
              <p className="font-headline text-xl">{t('empty')}</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[16rem]">
                {t('emptyHint')}
              </p>
            </div>
            <SheetClose asChild>
              <Button asChild className="mt-2" size="lg">
                <Link href="/collections/all">{t('browse')}</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
