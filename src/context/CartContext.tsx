import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItemsType } from "../types/cartItem";

interface CartContextType {
  cartItems: CartItemsType;
  setCartItems: React.Dispatch<
    React.SetStateAction<CartItemsType>
  >;
}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  return (
    <CartContext.Provider value={{ cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContextはCartProviderの中で使ってください");
  }
  return context;
};
