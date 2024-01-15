import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useCart } from '../../context/CartContext';
import { GoTrash } from "react-icons/go";
import "./CartDrawer.css"

interface Product {
  productId: string;
  title: string;
  images: string[];
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cart.map(async (item) => {
          const response = await fetch(`http://localhost:3000/api/products/${item.productId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: Product = await response.json();
          return { ...data, quantity: item.quantity, productId: item.productId };
        });

        const productData = await Promise.all(productPromises);
        setProducts(productData);

        const newTotalPrice = productData.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);

        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProducts();
  }, [cart]);

  return (
    <Drawer title={"Kundvagn"} placement="right" onClose={onClose} open={visible}>
      {cart.length === 0 ? (
        <div className="drawer-info">
          <p>Din varukorg är tom</p>
        </div>
      ) : (
        <>
          {products.map((product, index) => (
            <div className="drawer-info" key={index}>
              <img src={product.images[0]} alt={product.title} />
              <div className="prodict-info">
                <p id='title'>{product.title}</p>
                <p>Antal: {product.quantity}</p>
                <p id='price-info'>Pris: {product.price * product.quantity} kr</p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(product.productId)}
                >
                  <GoTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="drawer-info">
            <p>Totalt pris: {totalPrice} kr</p>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
