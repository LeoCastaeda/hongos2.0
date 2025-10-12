'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, PurchaseType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, purchaseType: PurchaseType) => void;
  removeFromCart: (productId: string, purchaseType: PurchaseType) => void;
  updateQuantity: (productId: string, purchaseType: PurchaseType, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, purchaseType: PurchaseType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.purchaseType === purchaseType
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.purchaseType === purchaseType
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity, purchaseType }];
    });
    toast({
        title: "Producto añadido",
        description: `${product.name} se ha añadido al carrito.`,
    })
  };

  const removeFromCart = (productId: string, purchaseType: PurchaseType) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.product.id === productId && item.purchaseType === purchaseType))
    );
  };

  const updateQuantity = (productId: string, purchaseType: PurchaseType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, purchaseType);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId && item.purchaseType === purchaseType ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.purchaseType === 'subscribe' ? item.product.price * 0.85 : item.product.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
