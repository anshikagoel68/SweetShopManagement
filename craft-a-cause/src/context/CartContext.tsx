import React, { createContext, useContext, useState, useCallback } from 'react';
import { Sweet } from '@/types/sweet';
import { toast } from 'sonner';

export interface CartItem {
  sweet: Sweet;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: string) => void;
  updateQuantity: (sweetId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((sweet: Sweet, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.sweet.id === sweet.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > sweet.quantity) {
          toast.error(`Only ${sweet.quantity} ${sweet.name} available`);
          return prev;
        }
        toast.success(`Updated ${sweet.name} quantity in cart`);
        return prev.map(item =>
          item.sweet.id === sweet.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (quantity > sweet.quantity) {
        toast.error(`Only ${sweet.quantity} ${sweet.name} available`);
        return prev;
      }
      
      toast.success(`Added ${sweet.name} to cart`);
      return [...prev, { sweet, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((sweetId: string) => {
    setItems(prev => {
      const item = prev.find(i => i.sweet.id === sweetId);
      if (item) {
        toast.success(`Removed ${item.sweet.name} from cart`);
      }
      return prev.filter(item => item.sweet.id !== sweetId);
    });
  }, []);

  const updateQuantity = useCallback((sweetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    
    setItems(prev => prev.map(item => {
      if (item.sweet.id === sweetId) {
        if (quantity > item.sweet.quantity) {
          toast.error(`Only ${item.sweet.quantity} available`);
          return item;
        }
        return { ...item, quantity };
      }
      return item;
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success('Cart cleared');
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.sweet.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
