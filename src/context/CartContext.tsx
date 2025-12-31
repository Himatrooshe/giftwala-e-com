'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    if (!product.inStock || product.stock <= 0) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === productId);
      if (!target) return prev;
      const safeQuantity = Math.max(0, Math.min(target.stock ?? target.quantity, quantity));
      if (safeQuantity === 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [items, totalQuantity, addToCart, removeFromCart, updateQuantity, clearCart, isDrawerOpen, openDrawer, closeDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


