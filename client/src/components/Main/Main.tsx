import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CategoryPage from '../CategoryPage/CategoryPage';

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:category/*" element={<CategoryPage />} />
        {/* Lägg till fler rutter här */}
      </Routes>
    </div>
  );
}

export default Main;
