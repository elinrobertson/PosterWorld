import { useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import Cookies from 'js-cookie';
import './Confirmation.css';

const Confirmation = () => {
  const { order } = useOrder();
  console.log('Confirmation - Order:', order);

  // useEffect(() => {
  //   console.log("Confirmation - UseEffect - Order:", order);
  //   Cookies.remove('cart');
  //   console.log("Confirmation - UseEffect - Cart removed");
  // }, [order]);

  
  useEffect(() => {
    console.log("Confirmation - UseEffect - Order:", order);
  
    // Konvertera den tomma arrayen till en sträng och sätt cookien
    Cookies.set('cart', JSON.stringify([]));
  
    console.log("Confirmation - UseEffect - Cart set as empty array");
  }, [order]);
  
  
//   useEffect(() => {
//     // Den här funktionen körs när komponenten unmountas
//     return () => {
//         Cookies.remove('cart'); // Ta bort 'cart'-cookien när komponenten unmountas
//     };
// }, []);

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
