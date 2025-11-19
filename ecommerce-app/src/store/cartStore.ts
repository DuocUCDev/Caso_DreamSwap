import { create } from 'zustand';
import type { Cart } from '../types';

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  getTotalItems: () => {
    const cart = get().cart;
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const cart = get().cart;
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  },
}));

