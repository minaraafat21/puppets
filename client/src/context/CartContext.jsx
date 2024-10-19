import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cartProducts from localStorage or default to an empty array
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  // Save cartProducts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
