import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useProfile } from './ProfileContext.jsx';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart]   = useLocalStorage('ds_cart', []);
  const [orders, setOrders] = useLocalStorage('ds_orders', []);
  const { profile } = useProfile();

  const addToCart = (item) => setCart(c => [...c, item]);
  const removeFromCart = (idx) => setCart(c => c.filter((_,i)=>i!==idx));
  const clearCart = () => setCart([]);

  const total = useMemo(() => cart.reduce((s, it) => s + (it.subtotal ?? 0), 0), [cart]);

  const checkout = ({ fecha, hora, metodo }) => {
    if (!cart.length) return null;
    const orderId = `DS-${Date.now()}`;
    const snapshot = { nombre: profile.nombre, email: profile.email, rem: profile.rem };
    const order = { id: orderId, items: cart, total, fecha, hora, metodo, profile: snapshot };
    setOrders(o => [order, ...o]);
    clearCart();
    return orderId;
  };

  const value = { cart, addToCart, removeFromCart, clearCart, total, orders, checkout };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
