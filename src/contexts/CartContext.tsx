'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedColor,
            selectedSize,
          },
        ];
      }
    });
  };

  const removeFromCart = (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
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

