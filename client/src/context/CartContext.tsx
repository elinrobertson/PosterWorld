import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
  price?: number; // Lägg till pris för varje produkt i CartItem
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void; // Lägg till ny funktion för att ta bort produkter
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren<React.ReactNode>) {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromCookie);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart), { sameSite: 'strict' });

    const newTotal = cart.reduce((total, item) => (item.price ? total + item.price * item.quantity : total), 0);

    setTotal(newTotal);
  }, [cart]);

  // Funktion för att lägga till produkter i varukorgen, memoized med useCallback
  const addToCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const existingCartItemIndex = prevCart.findIndex((item) => item.productId === productId);

        if (existingCartItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingCartItemIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { productId, quantity: 1 }];
        }
      });
    },
    [setCart]
  );

  // Funktion för att ta bort produkter från varukorgen, memoized med useCallback
  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    },
    [setCart]
  );

  // Returnera provider-komponenten med värdet av varukorgs-tillståndet
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>{children}</CartContext.Provider>;
}

// En hook för att använda varukorgs-tillståndet
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Funktion för att ladda varukorgen från cookies
const loadCartFromCookie = (): CartItem[] => {
  const savedCart = Cookies.get('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCart };
