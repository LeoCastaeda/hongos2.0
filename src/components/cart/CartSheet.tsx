'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useCart } from '@/context/CartContext';
import { CartItemCard } from './CartItemCard';
import { ScrollArea } from '../ui/scroll-area';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const t = useTranslations('Cart');
  const { cartItems, cartSubtotal, shippingTotal, hasCalculatedShipping } =
    useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('title', { count: itemCount })}</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-6">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItemCard key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
              >
                <source src="/videos/abajo.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/60 z-[1] rounded-lg" />
              <div className="w-full space-y-4 relative z-10">
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg text-white">
                  <p>{t('subtotal')}</p>
                  <p>{cartSubtotal.toFixed(2)}€</p>
                </div>
                {hasCalculatedShipping && shippingTotal > 0 ? (
                  <p className="text-sm text-gray-200 text-center">
                    {t('shippingAmount', { amount: shippingTotal.toFixed(2) })}
                  </p>
                ) : (
                  <p className="text-sm text-gray-200 text-center">
                    {t('shippingNote')}
                  </p>
                )}
                <SheetClose asChild>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">{t('checkout')}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="link"
                    className="w-full text-white hover:text-white/80"
                  >
                    <Link href="/collections/all">{t('continue')}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-xl font-semibold">{t('empty')}</p>
            <p className="text-muted-foreground mt-2">{t('emptyHint')}</p>
            <SheetClose asChild>
              <Button asChild className="mt-4">
                <Link href="/collections/all">{t('continue')}</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
