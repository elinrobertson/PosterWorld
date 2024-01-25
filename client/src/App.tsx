import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import UserProvider from './context/UserContext';
import Footer from './components/Footer/Footer';
import './main.css';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <Navbar />
            <Routes>
              <Route path="/*" element={<Main />} />
            </Routes>
            <Footer />
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
