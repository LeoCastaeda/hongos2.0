'use client';

import Link from 'next/link';
import {
  Leaf,
  Menu,
  ShoppingCart,
  User,
  X,
  type LucideIcon,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { benefits } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { CartSheet } from '../cart/CartSheet';
import { useUser, useAuth } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';

const navLinks = [
  { href: '/collections/all', label: 'Comprar' },
  { href: '/learn', label: 'Aprender' },
  { href: '/about', label: 'Nosotros' },
  { href: '/quiz', label: 'Quiz' },
];

export function Header() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const UserMenu = () => {
    if (isUserLoading) {
      return (
        <Button variant="ghost" size="icon">
          <div className="h-5 w-5 animate-pulse bg-muted rounded-full" />
        </Button>
      );
    }

    if (!user) {
      return (
        <Button asChild variant="ghost" size="icon">
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Boulet
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
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
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Boulet</span>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Cerrar</span>
                        </Button>
                    </SheetClose>
                </div>
                <nav className="flex-grow mt-6">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link href={link.href} className="text-lg font-medium hover:text-primary">
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t pt-6">
                    <h3 className="mb-4 font-semibold text-muted-foreground">Comprar por beneficio</h3>
                    <ul className="space-y-4">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon as LucideIcon;
                            return (
                                <li key={benefit.id}>
                                    <SheetClose asChild>
                                        <Link href={`/collections/${benefit.slug}`} className="flex items-center gap-3 text-lg font-medium hover:text-primary">
                                           <Icon className="w-5 h-5 text-muted-foreground" />
                                           <span>{benefit.name}</span>
                                        </Link>
                                    </SheetClose>
                                </li>
                            )
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
            <span className="font-bold font-headline">Boulet</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserMenu />
            <CartSheet>
                <Button variant="ghost" size="icon" className="relative">
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                    </span>
                )}
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
                </Button>
            </CartSheet>
          </div>
        </div>
      </div>
    </header>
  );
}
