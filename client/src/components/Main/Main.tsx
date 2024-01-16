import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CategoryPage from '../CategoryPage/CategoryPage';
import ProductDetail from "../ProductDetail/ProductDetail";
import Login from "../Login/Login";

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:category/*" element={<CategoryPage />} />
        <Route path="/:category/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        {/* Lägg till fler rutter här */}
      </Routes>
    </div>
  );
}

export default Main;
