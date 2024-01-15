// CartDrawer.tsx
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useCart } from '../../context/CartContext';
import "./CartDrawer.css"

interface Product {
    title: string,
    images: string[],
    price: number;
    quantity: number
}

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const { cart } = useCart();
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
          return { ...data, quantity: item.quantity }; // Lägg till kvantitet för varje produkt
        });

        const productData = await Promise.all(productPromises);
        setProducts(productData);

        // Uppdatera totalpriset varje gång produkterna ändras
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
      {products.map((product, index) => (
        <div className="drawer-info" key={index}>
          <p>Produkt: {product.title}</p>
          <img src={product.images[0]} alt={product.title} />
          <p>Antal: {product.quantity}</p>
          <p>Pris: {product.price * product.quantity} kr</p>
          <hr />
        </div>
      ))}
      <div className="drawer-info">
        <p>Totalt pris: {totalPrice} kr</p>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
