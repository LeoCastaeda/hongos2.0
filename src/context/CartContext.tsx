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
  subtotal?: number;
  shipping?: number;
  tax?: number;
  shippingLabel?: string | null;
  needsShipping?: boolean;
  hasCalculatedShipping?: boolean;
  error?: string;
};

export type ShippingAddressInput = {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phone?: string;
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
  updateShippingAddress: (address: ShippingAddressInput) => Promise<void>;
  cartTotal: number;
  cartSubtotal: number;
  shippingTotal: number;
  taxTotal: number;
  shippingLabel: string | null;
  needsShipping: boolean;
  hasCalculatedShipping: boolean;
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
  const [wooTotal, setWooTotal] = useState<number | null>(null);
  const [wooSubtotal, setWooSubtotal] = useState<number | null>(null);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [shippingLabel, setShippingLabel] = useState<string | null>(null);
  const [needsShipping, setNeedsShipping] = useState(false);
  const [hasCalculatedShipping, setHasCalculatedShipping] = useState(false);

  const applyWooResponse = useCallback((data: CartApiResponse) => {
    setCartItems(data.items ?? []);
    if (typeof data.total === 'number') setWooTotal(data.total);
    if (typeof data.subtotal === 'number') setWooSubtotal(data.subtotal);
    if (typeof data.shipping === 'number') setShippingTotal(data.shipping);
    if (typeof data.tax === 'number') setTaxTotal(data.tax);
    setShippingLabel(data.shippingLabel ?? null);
    setNeedsShipping(Boolean(data.needsShipping));
    setHasCalculatedShipping(Boolean(data.hasCalculatedShipping));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const data = await readCartApi('/api/cart');
        if (cancelled) return;

        if (data.mode === 'woocommerce') {
          setCartMode('woocommerce');
          applyWooResponse(data);
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
  }, [applyWooResponse]);

  useEffect(() => {
    if (!isCartReady || cartMode !== 'local') return;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, isCartReady, cartMode]);

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
    setWooTotal(0);
    setWooSubtotal(0);
    setShippingTotal(0);
    setTaxTotal(0);
    setShippingLabel(null);
    setNeedsShipping(false);
    setHasCalculatedShipping(false);
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

  const updateShippingAddress = useCallback(
    async (address: ShippingAddressInput) => {
      if (cartMode !== 'woocommerce') return;
      setIsSyncing(true);
      try {
        const data = await readCartApi('/api/cart/address', {
          method: 'POST',
          body: JSON.stringify(address),
        });
        applyWooResponse(data);
      } finally {
        setIsSyncing(false);
      }
    },
    [applyWooResponse, cartMode]
  );

  const localSubtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const cartSubtotal =
    cartMode === 'woocommerce' && wooSubtotal != null ? wooSubtotal : localSubtotal;
  const cartTotal =
    cartMode === 'woocommerce' && wooTotal != null
      ? wooTotal
      : localSubtotal + shippingTotal;

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
        updateShippingAddress,
        cartTotal,
        cartSubtotal,
        shippingTotal,
        taxTotal,
        shippingLabel,
        needsShipping,
        hasCalculatedShipping,
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
