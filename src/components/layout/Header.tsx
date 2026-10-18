'use client';

import { useState, useEffect } from 'react';
import {
  Leaf,
  Menu,
  ShoppingCart,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { benefits } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CartSheet } from '../cart/CartSheet';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('Nav');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/collections/all', label: t('shop') },
    { href: '/learn', label: t('learn') },
    { href: '/about', label: t('about') },
    { href: '/quiz', label: t('quiz') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A] text-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline uppercase tracking-wider text-xl">
              Bouletmushrooms
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-xs font-headline uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Bouletmushrooms</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">{t('closeMenu')}</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow mt-6">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="text-lg font-medium hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <LanguageSwitcher className="text-foreground [&_button]:text-foreground/60 [&_button[aria-current=true]]:text-primary [&_span]:text-foreground/30" />
                  </div>
                  <div className="mt-8 border-t pt-6">
                    <h3 className="mb-4 font-semibold text-muted-foreground">
                      {t('shopByBenefit')}
                    </h3>
                    <ul className="space-y-4">
                      {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                          <li key={benefit.id}>
                            <SheetClose asChild>
                              <Link
                                href={`/collections/${benefit.slug}`}
                                className="flex items-center gap-3 text-lg font-medium hover:text-primary"
                              >
                                <Icon className="w-5 h-5 text-muted-foreground" />
                                <span>{benefit.name}</span>
                              </Link>
                            </SheetClose>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Bouletmushrooms</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <CartSheet>
              <Button id="cart-icon" variant="ghost" size="icon" className="relative">
                <span
                  id="cart-count"
                  className={`absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-xs font-bold text-primary-foreground transition-opacity ${
                    mounted && itemCount > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={!(mounted && itemCount > 0)}
                >
                  {mounted ? itemCount : 0}
                </span>
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">{t('cart')}</span>
              </Button>
            </CartSheet>
          </div>
        </div>
      </div>
    </header>
  );
}
