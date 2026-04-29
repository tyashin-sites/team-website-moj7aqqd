'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from '@/lib/tyashin-client';
import type { CartData, CartItem } from '@/lib/tyashin-client';

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  taxAmount: number;
  taxName: string;
  currency: string;
  loading: boolean;
  add: (productId: string, variantId?: string, qty?: number) => Promise<void>;
  update: (productId: string, qty: number, variantId?: string) => Promise<void>;
  remove: (productId: string, variantId?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error('Cart load failed:', err);
      // Set empty cart on error
      setCart({
        items: [],
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        taxName: 'Tax',
        taxInclusive: false,
        total: 0,
        currency: 'USD',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = async (productId: string, variantId?: string, qty = 1) => {
    try {
      await addToCart(productId, variantId, qty);
      await refresh();
    } catch (err) {
      console.error('Add to cart failed:', err);
      throw err;
    }
  };

  const update = async (productId: string, qty: number, variantId?: string) => {
    try {
      await updateCartItem(productId, qty, variantId);
      await refresh();
    } catch (err) {
      console.error('Update cart failed:', err);
      throw err;
    }
  };

  const remove = async (productId: string, variantId?: string) => {
    try {
      await removeCartItem(productId, variantId);
      await refresh();
    } catch (err) {
      console.error('Remove from cart failed:', err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: cart?.items || [],
        count: cart?.items.reduce((s, i) => s + i.quantity, 0) || 0,
        subtotal: cart?.subtotal || 0,
        total: cart?.total || 0,
        taxAmount: cart?.taxAmount || 0,
        taxName: cart?.taxName || 'Tax',
        currency: cart?.currency || 'USD',
        loading,
        add,
        update,
        remove,
        refresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}