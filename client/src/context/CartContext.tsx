import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Product {
  title: string;
  price: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren<React.ReactNode>) {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromCookie);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart), { sameSite: 'strict' });

    const newTotal = cart.reduce((total, item) => {
      const productPrice = getProductPrice(item.productId);
      return total + productPrice * item.quantity;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

  const addToCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const existingCartItem = prevCart.find((item) => item.productId === productId);

        if (existingCartItem) {
          return prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { productId, quantity: 1 }];
        }
      });
    },
    [setCart]
  );

  return <CartContext.Provider value={{ cart, addToCart, total }}>{children}</CartContext.Provider>;
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const getProductPrice = (productId: string): number => {
  const staticProductPrices: Record<string, number> = {
    productId: 200,
  };

  return staticProductPrices[productId] || 0;
};

const loadCartFromCookie = (): CartItem[] => {
  const savedCart = Cookies.get('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCart };
