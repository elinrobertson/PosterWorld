import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Lägg till fler rutter här */}
      </Routes>
    </div>
  );
}

export default Main;
