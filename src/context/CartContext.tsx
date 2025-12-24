import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItemsType } from "../types/cartItem";
import type { MenuType } from "../types/menu";

interface CartMenuItemsType extends MenuType {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemsType;
  setCartItems: React.Dispatch<
    React.SetStateAction<CartItemsType>
  >;
  getTotalPrice: (menus: Array<CartMenuItemsType>) => number;
}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  const getTotalPrice = (menus: Array<CartMenuItemsType>) => { 
    const totalPrice = menus.reduce((total, menu) =>  
       total + menu.price * menu.quantity
    , 0);
    return totalPrice;
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, getTotalPrice }}>
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
