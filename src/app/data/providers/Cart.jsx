'use client';
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
  });
  
  const addToCart = (productToAdd) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.product._id === productToAdd._id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product._id === productToAdd._id
            // 1. Increase quantity if it exists
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem // Not a match – unchanged
        )
      );
    } else {
      // 2. OR Add product and initial quantity of 1
      setCartItems([...cartItems, { product: productToAdd, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.product._id === id);

    if (isItemInCart?.qty === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.product._id !== id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product._id === id
            // Decrement
            ? { ...cartItem, qty: cartItem.qty - 1 }
            : cartItem // Not a match – unchanged
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.qty, 0);
  };

  useEffect(() => {
    // console.log('load')
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // console.log('save')
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};