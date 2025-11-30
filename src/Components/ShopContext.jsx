import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
