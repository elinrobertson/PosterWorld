import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useCart } from '../../context/CartContext';
import { GoTrash } from "react-icons/go";
import "./CartDrawer.css"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { motion } from "framer-motion"

interface Product {
  productId: string;
  title: string;
  images: string[];
  price: number;
  price_id: string;
  quantity: number;
}

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (cart.length === 0) {
          setProducts([]); // Sätt products till en tom array om cart är tom
          setTotalPrice(0); // Sätt totalPrice till 0 om cart är tom
          return;
        }

        const productPromises = cart.map(async (item) => {
          if (!item.productId) {
            console.error('ProductId is undefined for item:', item);
            return null;
          }

          const response = await fetch(`http://localhost:3000/api/products/${item.productId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: Product = await response.json();
          return { ...data, quantity: item.quantity, productId: item.productId };
        });

        const productData = await Promise.all(productPromises);
        const filteredProductData = productData.filter((product) => product !== null) as Product[];
        setProducts(filteredProductData);

        const newTotalPrice = filteredProductData.reduce((total, product) => {
          return total + (product?.price || 0) * (product?.quantity || 0);
        }, 0);

        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProducts();
  }, [cart, visible]); // Lägg till visible i beroendelistan

  async function handlePayment() {
    try {
      const validProducts = products.filter((product) => product.productId);

      const response = await fetch('http://localhost:3000/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validProducts),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        // Hantera fel här
      }
    } catch (error) {
      // Hantera andra fel här
    }
  }

  return (
    <Drawer title={"Varukorg"} placement="right" onClose={onClose} open={visible}>
      {cart.length === 0 ? (
        <div className="drawer-info">
          <p>Din varukorg är tom</p>
        </div>
      ) : (
        <>
          {products.map((product, index) => (
            <div className="drawer-info" key={index}>
              <img src={product.images[0]} alt={product.title} />
              <div className="product-info">
                <p id='title'>{product.title}</p>
                <p>Antal: {product.quantity}</p>
                <p id='price-info'>Pris: {product.price * product.quantity} kr</p>
                <div className="cart-buttons">
                  <div className="circle-buttons">
                    <button onClick={() => decreaseQuantity(product.productId)}><AiOutlineMinusCircle /></button>
                    <button onClick={() => increaseQuantity(product.productId)}><AiOutlinePlusCircle /></button>
                  </div>
                  <button onClick={() => removeFromCart(product.productId)} className="trash-button"><GoTrash /></button>
                </div>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>Totalt pris: {totalPrice} kr</p>
          </div>
          <motion.button 
            className='checkout-button'
            onClick={handlePayment}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>Gå vidare till kassan
          </motion.button>
        </>
      )}
    </Drawer>
  );
}

export default CartDrawer;
