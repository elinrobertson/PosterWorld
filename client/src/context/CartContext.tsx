import React, { createContext, useContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<PropsWithChildren<React.ReactNode>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Ladda varukorgen från cookie när komponenten monteras
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Spara varukorgen i cookie när den uppdateras
    Cookies.set('cart', JSON.stringify(cart), { sameSite: 'strict' });
  }, [cart]);

  const addToCart = useCallback(
    (productId: string) => {
      // Implementera logik för att lägga till produkter i varukorgen här
      // Du kan använda din befintliga addToCart-funktion här

      setCart((prevCart) => {
        const existingCartItem = prevCart.find((item) => item.productId === productId);

        if (existingCartItem) {
          // Om produkten redan finns i varukorgen, öka antalet
          return prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Om produkten inte finns i varukorgen, lägg till den
          return [...prevCart, { productId, quantity: 1 }];
        }
      });
    },
    [setCart]
  );

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
