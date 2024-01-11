import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { CartProvider } from './context/CartContext';

import './main.css';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
