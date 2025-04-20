'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const storedCart = localStorage.getItem(`cart_${user.uid}`);
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } else {
        setUserId(null);
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Persist cart in localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // ✅ Safe clearCart with userId check
  const clearCart = useCallback(() => {
    if (userId !== null) {
      setCart([]);
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]));
    }
  }, [userId]);

  const calculateTotal = useCallback(() =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0),
  [cart]);

  const getTotalItemCount = useCallback(() =>
    cart.reduce((total, item) => total + item.quantity, 0),
  [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        getTotalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
