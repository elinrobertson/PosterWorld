import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
  price: number; // Lägg till en standardvärde eller justera efter ditt behov
  title: string; // Lägg till en standardvärde eller justera efter ditt behov
  images: string[]; // Lägg till en standardvärde eller justera efter ditt behov
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string, title: string, images: string[], price: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  // clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren<React.ReactNode>) {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromCookie);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    console.log('CartProvider - cart:', cart);
  
    Cookies.set('cart', JSON.stringify(cart), { sameSite: 'strict' });
  
    const newTotal = cart.reduce((total, item) => (item.price !== undefined ? total + item.price * item.quantity : total), 0);
  
    console.log('CartProvider - newTotal:', newTotal);
  
    setTotal(newTotal);
  }, [cart]);
  
  

  const addToCart = useCallback(
    (productId: string, title: string, images: string[], price: number) => {
      setCart((prevCart) => {
        const existingCartItemIndex = prevCart.findIndex((item) => item.productId === productId);

        if (existingCartItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingCartItemIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { productId, quantity: 1, title, images, price }];
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

  // Funktion för att minska antalet av en produkt i varukorgen
  const increaseQuantity = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const existingCartItem = updatedCart.find((item) => item.productId === productId);

        if (existingCartItem) {
          existingCartItem.quantity += 1;
        }

        return updatedCart;
      });
    },
    [setCart]
  );

      // Funktion för att minska antalet av en produkt i varukorgen
  const decreaseQuantity = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const existingCartItem = updatedCart.find((item) => item.productId === productId);

        if (existingCartItem && existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          // Om antalet är 1 eller mindre, ta bort produkten från varukorgen
          return updatedCart.filter((item) => item.productId !== productId);
        }

        return updatedCart;
      });
    },
    [setCart]
  );


  // const clearCart = useCallback(() => {
  //   setCart([]);
  // }, [setCart]);

  // Returnera provider-komponenten med värdet av varukorgs-tillståndet
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
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
