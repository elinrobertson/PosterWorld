import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
  price?: number; // Lägg till pris för varje produkt i CartItem
}

// interface Product {
//   title: string;
//   price: number;
// }

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

    const newTotal = cart.reduce((total, item) => (item.price ? total + item.price * item.quantity : total), 0);


    setTotal(newTotal);
  }, [cart]);

  // const getProductPrice = async (productId: string): Promise<number> => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/products/${productId}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data: Product = await response.json();
  //     return data.price;
  //   } catch (error) {
  //     console.error('Error fetching product price:', error);
  //     return 0;
  //   }
  // };

  const addToCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const existingCartItemIndex = prevCart.findIndex((item) => item.productId === productId);
  
        if (existingCartItemIndex !== -1) {
          // Om produkten redan finns i varukorgen, öka antalet
          const updatedCart = [...prevCart];
          updatedCart[existingCartItemIndex].quantity += 1;
          return updatedCart;
        } else {
          // Om produkten inte finns i varukorgen, lägg till den
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

const loadCartFromCookie = (): CartItem[] => {
  const savedCart = Cookies.get('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCart };
