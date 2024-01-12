// CartDrawer.tsx
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useCart } from '../../context/CartContext';
import "./CartDrawer.css"

interface Product {
    title: string,
    images: string[],
    price: number
}

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cart.map(async (item) => {
          const response = await fetch(`http://localhost:3000/api/products/${item.productId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: Product = await response.json();
          return data;
        });

        const productData = await Promise.all(productPromises);
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProducts();
  }, [cart]);

  return (
    <Drawer title="Kundvagn" placement="right" onClose={onClose} visible={visible}>
      {products.map((product, index) => (
        <div className="drawer-info" key={index}>
          <p>Produkt: {product.title}</p>
          <img src={product.images[0]} />
          <p>Antal: {cart[index].quantity}</p>
          <p>Pris: {product.price} kr</p>
          <hr />
        </div>
      ))}
    </Drawer>
  );
};

export default CartDrawer;
