import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCart, CartItem } from '../context/CartContext';

interface OrderItem extends CartItem {}

interface OrderContextProps {
  order: OrderItem[];
  addProductToOrder: (productId: string, quantity: number) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { cart } = useCart();
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addProductToOrder = (productId: string, quantity: number) => {
    try {
      console.log('Cart:', cart);
      const productInfo = cart.find((item) => item.productId === productId);
      console.log('Product info:', productInfo);
  
      if (productInfo) {
        setOrder((prevOrder) => [
          ...prevOrder,
          {
            ...productInfo,
            quantity,
            total: productInfo.price * quantity,
          },
        ]);
      } else {
        console.error('Product information not found in cart');
      }
    } catch (error) {
      console.error('Error adding product to order:', error);
    }
  };  

  useEffect(() => {
    console.log('OrderProvider - order:', order);
  }, [order]);

  useEffect(() => {
    setOrder([...cart]); // Uppdatera order direkt från cart
  }, [cart]);

  return (
    <OrderContext.Provider value={{ order, addProductToOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useOrder };  
export type { OrderItem };
