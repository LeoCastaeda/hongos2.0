'use client';

import { useCart } from '@/context/CartContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { cartItems, cartTotal } = useCart();
  const shippingCost = 0; // Envío gratuito por ahora
  const total = cartTotal + shippingCost;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        {cartItems.map(item => {
          const placeholder = PlaceHolderImages.find(p => p.id === item.product.image);
          const imageUrl = placeholder?.imageUrl || `https://picsum.photos/seed/${item.product.id}/100/100`;
          
          return (
            <div key={item.product.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={imageUrl}
                  alt={item.product.name}
                  fill
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
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium">{cartTotal.toFixed(2)}€</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Envío</p>
          <p className="font-medium">
            {shippingCost > 0 ? `${shippingCost.toFixed(2)}€` : 'Gratis'}
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between font-bold text-lg">
        <p>Total</p>
        <p>{total.toFixed(2)}€</p>
      </div>
    </div>
  );
}