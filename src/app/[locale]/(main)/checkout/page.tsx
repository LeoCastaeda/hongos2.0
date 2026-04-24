'use client';

import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/collections/all');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <p>Tu carrito está vacío. Serás redirigido...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary">
        <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Finalizar Compra
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-headline font-bold mb-6">Información de Envío</h2>
              <CheckoutForm />
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold mb-6">Resumen del Pedido</h2>
              <OrderSummary />
            </div>
        </div>
        </div>
    </div>
  );
}