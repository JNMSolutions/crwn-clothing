import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const { id } = productToAdd;

  const existingCartItem = cartItems.find((item) => item.id === id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 }
      : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToAdd) => {
  const { id } = productToAdd;

  const existingCartItem = cartItems.find((item) => item.id === id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id ? { ...item, quantity: item.quantity - 1 }
      : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 0 }];
};

const clearCartItem = (cartItems, productToClear) => {
  const { id } = productToClear;

  const existingCartItem = cartItems.find((item) => item.id === id);

  if (existingCartItem) {
    return cartItems.filter((item) =>
      item.id !== productToClear.id ?? item
    );
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.quantity, 0);
    const newCartTotal = cartItems.reduce((totalValue, cartItem) => totalValue + (cartItem.price * cartItem.quantity), 0);

    setCartCount(newCartCount);    
    setCartTotal(newCartTotal);    
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart, 
    cartItems, 
    cartCount, 
    cartTotal 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
