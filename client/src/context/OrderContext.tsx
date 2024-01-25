import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { useCart } from './CartContext';

interface OrderItem {
    productId: string;
    quantity: number;
    price: number; 
    price_id: string;
    title: string; 
    images: string[];  
  }

  interface OrderContextProps {
    order: OrderItem[];
    addProductToOrder: (productId: string, quantity: number) => void;
  }

  const OrderContext = createContext<OrderContextProps | undefined>(undefined);
    
    export function OrderProvider({ children }: PropsWithChildren<React.ReactNode>) {
        const { cart } = useCart();
        const [order, setOrder] = useState<OrderItem[]>([]);
      
        const addProductToOrder = (productId: string, quantity: number) => {
          try {
            // Hämta information om produkten från cart
            const productInfo = cart.find((item) => item.productId === productId);
      
            if (productInfo) {
              console.log('OrderContext - Product Info:', productInfo);
              const updatedOrder = [...order, { ...productInfo, quantity }];
              setOrder(updatedOrder);
              console.log('OrderContext - Updated Order:', updatedOrder);
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