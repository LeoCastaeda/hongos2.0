'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { Product, CartItem } from '@/lib/types';

type CartMode = 'unknown' | 'local' | 'woocommerce';

type CartApiResponse = {
  mode?: CartMode;
  items?: CartItem[];
  total?: number;
  error?: string;
};

interface CartContextType {
  cartItems: CartItem[];
  isCartReady: boolean;
  cartMode: CartMode;
  isSyncing: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

async function readCartApi(path: string, init?: RequestInit): Promise<CartApiResponse> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const data = (await response.json().catch(() => ({}))) as CartApiResponse;
  if (!response.ok) {
    throw new Error(data.error || `Cart request failed (${response.status})`);
  }
  return data;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartReady, setIsCartReady] = useState(false);
  const [cartMode, setCartMode] = useState<CartMode>('unknown');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const data = await readCartApi('/api/cart');
        if (cancelled) return;

        if (data.mode === 'woocommerce') {
          setCartMode('woocommerce');
          setCartItems(data.items ?? []);
        } else {
          setCartMode('local');
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            try {
              setCartItems(JSON.parse(storedCart));
            } catch {
              setCartItems([]);
            }
          }
        }
      } catch {
        if (cancelled) return;
        setCartMode('local');
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            setCartItems(JSON.parse(storedCart));
          } catch {
            setCartItems([]);
          }
        }
      } finally {
        if (!cancelled) setIsCartReady(true);
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isCartReady || cartMode !== 'local') return;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, isCartReady, cartMode]);

  const applyWooResponse = useCallback((data: CartApiResponse) => {
    setCartItems(data.items ?? []);
  }, []);

  const addToCart = useCallback(
    async (product: Product, quantity: number) => {
      const tryWoo = cartMode === 'woocommerce' || (cartMode !== 'local' && !!product.wooId);

      if (tryWoo && product.wooId) {
        setIsSyncing(true);
        try {
          const data = await readCartApi('/api/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId: product.wooId, quantity }),
          });
          setCartMode('woocommerce');
          applyWooResponse(data);
          return;
        } catch (error) {
          console.error('[cart] WooCommerce add failed, using local cart', error);
          setCartMode((prev) => (prev === 'woocommerce' ? prev : 'local'));
        } finally {
          setIsSyncing(false);
        }
      }

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { product, quantity }];
      });
    },
    [applyWooResponse, cartMode]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      if (cartMode === 'woocommerce') {
        const line = cartItems.find((item) => item.product.id === productId);
        if (!line?.key) return;
        setIsSyncing(true);
        try {
          const data = await readCartApi('/api/cart/remove', {
            method: 'POST',
            body: JSON.stringify({ key: line.key }),
          });
          applyWooResponse(data);
        } finally {
          setIsSyncing(false);
        }
        return;
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId)
      );
    },
    [applyWooResponse, cartItems, cartMode]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (cartMode === 'woocommerce') {
        const line = cartItems.find((item) => item.product.id === productId);
        if (!line?.key) return;
        setIsSyncing(true);
        try {
          const data = await readCartApi('/api/cart/update', {
            method: 'POST',
            body: JSON.stringify({ key: line.key, quantity }),
          });
          applyWooResponse(data);
        } finally {
          setIsSyncing(false);
        }
        return;
      }

      if (quantity <= 0) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product.id !== productId)
        );
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    },
    [applyWooResponse, cartItems, cartMode]
  );

  const clearCart = useCallback(async () => {
    setCartItems([]);
    if (cartMode !== 'woocommerce') return;

    setIsSyncing(true);
    try {
      for (const item of [...cartItems]) {
        if (!item.key) continue;
        await readCartApi('/api/cart/remove', {
          method: 'POST',
          body: JSON.stringify({ key: item.key }),
        }).catch(() => undefined);
      }
      const data = await readCartApi('/api/cart').catch(() => null);
      if (data) applyWooResponse(data);
    } finally {
      setIsSyncing(false);
    }
  }, [applyWooResponse, cartItems, cartMode]);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartReady,
        cartMode,
        isSyncing,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
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
