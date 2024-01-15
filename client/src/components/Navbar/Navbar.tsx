import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingBag, HiShoppingBag } from 'react-icons/hi2';
import { GoPerson } from 'react-icons/go';
import { IoEarthOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../CartDrawer/CartDrawer';
import './Navbar.css';

interface Category {
  _id: string;
  title: string;
  description: string;
}

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched categories:', data); 
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isCartEmpty = cartItemCount === 0;

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="navbar-wrapper">
      <div className="discount-container">
        <p>Här kommer lite random text om en rabattkod</p>
      </div>
      <div className="navbar-container">
        <div className="logo-container">
          <h2>
            <NavLink to="/" className="logo-link">
              Poster
              <span>W</span>
              <IoEarthOutline style={{ color: '#89B9AD' }} />
              <span>rld</span>
            </NavLink>
          </h2>
        </div>
        <div className="links-container">
          <ul>
            {categories.map((category) => (
              <motion.li
                key={category._id}
                className={category.title.toLowerCase() === activeCategory ? 'active' : ''}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={`/${category.title.toLowerCase()}`}
                  onClick={() => {
                    console.log('Before:', activeCategory);
                    setActiveCategory(
                      activeCategory === category.title.toLowerCase() ? null : category.title.toLowerCase()
                    );
                    console.log('After:', activeCategory);
                  }}
                >
                  {category.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="icons-container">
          <GoPerson />
          <motion.div className="cart-icon" onClick={showDrawer}>
            {isCartEmpty ? <HiOutlineShoppingBag /> : <HiShoppingBag />}
            {cartItemCount > 0 && <div className="cart-item-count">{cartItemCount}</div>}
          </motion.div>
        </div>
      </div>
      <CartDrawer visible={drawerVisible} onClose={closeDrawer} />
    </div>
  );
};

export default Navbar;
