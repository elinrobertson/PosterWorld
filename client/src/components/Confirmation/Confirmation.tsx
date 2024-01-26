// import React from 'react';
import { useOrder } from '../../context/OrderContext';
import './Confirmation.css';


const Confirmation = () => {
  const { order } = useOrder();
  console.log('Confirmation - Order:', order);

  return (
    <div className='confirmation-wrapper'>
      <h3>Orderbekräftelse</h3>
      <p>Produkter i ordern:</p>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            <p>Antal: {item.quantity}</p>
            <p>Titel: {item.title}</p>
            <p>Pris: {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Confirmation;
