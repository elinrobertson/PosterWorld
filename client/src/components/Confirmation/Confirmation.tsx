import { useContext, useEffect, useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { CartContext, CartItem } from '../../context/CartContext';
import Cookies from 'js-cookie';
import './Confirmation.css';


const Confirmation = () => {
  useOrder();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <p>Varukorgen kunde inte laddas...</p>;
  }

  const { cart, clearCart } = cartContext;

  // Flyttade useState till toppnivå
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (localCartItems.length > 0) {
      // Ställ in 'cart'-cookien när komponenten monteras
      Cookies.set('cart', JSON.stringify(localCartItems));
      console.log("Confirmation - UseEffect - Cart set as localCartItems");
    }

    // Cleara cart i CartContext när komponenten unmounts
    return () => {
      clearCart();
    };
  }, [localCartItems, clearCart]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (cart && cart.length > 0) {
      setLocalCartItems(cart);
    }
  }, [cart]);

  // Beräkna totalbeloppet
  const totalPrice = localCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='confirmation-wrapper'>
      <h3>Orderbekräftelse</h3>
      <ul>
        {localCartItems.map((item, index) => (
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
        <p>Totalt: {totalPrice} kr</p>
      </div>
    </div>
  );
};

export default Confirmation;


