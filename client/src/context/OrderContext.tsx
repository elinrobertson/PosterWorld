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
    console.log('addProductToOrder is called');
    try {
      const productInfo = cart.find((item) => item.productId === productId);
      console.log('Product info:', productInfo);
      if (productInfo) {
        setOrder((prevOrder) => {
          const updatedOrder = [...prevOrder, { ...productInfo, quantity }];
          console.log('Product added to order:', { ...productInfo, quantity });
          return updatedOrder;
        });
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

  console.log('OrderProvider - order:', order);

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
export { useOrder };  export type { OrderItem };

