'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // Solo al entrar en la confirmación. clearCart cambia de identidad en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
