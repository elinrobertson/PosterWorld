import React, { useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import Cookies from 'js-cookie';
import './Confirmation.css';

const Confirmation = () => {
  const { order } = useOrder();
  console.log('Confirmation - Order:', order);

  useEffect(() => {
    Cookies.remove('cart')
  },[])

  return (
    <div className='confirmation-wrapper'>
      <h3>Orderbekräftelse</h3>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            <div className='confirmation-image'>
              <img src={item.images[0]} alt={`Product ${index + 1}`} />
            </div>
            <div className='confirmation-details'>
              <h4>{item.title}</h4>
              <p>Antal: {item.quantity} st</p>
              <p>Pris: {item.price * item.quantity} kr</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='total-price'>
        <p>Totalt: {order.reduce((acc, item) => acc + item.price * item.quantity, 0)} kr</p>
      </div>
    </div>
  );
};

export default Confirmation;
