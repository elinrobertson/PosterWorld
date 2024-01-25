import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  price_id: string;
  title: string; 
  images: string[]; 
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren<{ children: React.ReactElement }>) {
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
    (product: CartItem) => {
      console.log('Adding to cart - Product ID:', product.productId, 'Price:', product.price);
      setCart((prevCart) => {
        const existingCartItemIndex = prevCart.findIndex((item) => item.productId === product.productId);
  
        if (existingCartItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingCartItemIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, product];
        }
      });
    },
    [setCart]
  );  

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    },
    [setCart]
  );

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

  const decreaseQuantity = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const existingCartItem = updatedCart.find((item) => item.productId === productId);

        if (existingCartItem && existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          return updatedCart.filter((item) => item.productId !== productId);
        }

        return updatedCart;
      });
    },
    [setCart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const loadCartFromCookie = (): CartItem[] => {
  const savedCart = Cookies.get('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCart };
