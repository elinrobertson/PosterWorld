import React from 'react';
import { useCart } from '../../context/CartContext';
import './Confirmation.css';

interface Product {
  productId: string;
  title?: string; // Uppdaterad här för att tillåta 'undefined'
  images?: string[]; // Uppdaterad här för att tillåta 'undefined'
  price: number;
  quantity: number;
}

const Confirmation = () => {
  const { cart, total } = useCart();

  return (
    <div className='confirmation-wrapper'>
      <h3>Tack för din beställning!</h3>
      <div className='order-summary'>
        <h4>Beställningsinformation:</h4>
        {cart.map((item: Product) => (
          <div key={item.productId} className='order-item'>
            {/* Kontrollera om title och images är definierade innan du använder dem */}
            {item.images && item.title && (
              <>
                <img src={item.images[0]} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Pris: {item.price} SEK</p>
                  <p>Antal: {item.quantity}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <p>Totalt: {total} SEK</p>
      </div>
    </div>
  );
};

export default Confirmation;
