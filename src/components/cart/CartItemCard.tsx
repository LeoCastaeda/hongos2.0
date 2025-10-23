'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { CartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const placeholder = PlaceHolderImages.find(p => p.id === item.product.image);
  const imageUrl = placeholder?.imageUrl || `https://picsum.photos/seed/${item.product.id}/100/100`;

  const price = item.product.price;

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
            <div className="flex flex-col gap-1">
                <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
                    {item.product.name}
                </Link>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                onClick={() => removeFromCart(item.product.id)}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
            </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-semibold">{(price * item.quantity).toFixed(2)}€</p>
        </div>
      </div>
    </div>
  );
}
