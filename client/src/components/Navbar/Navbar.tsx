import React, { useState, useEffect, useContext } from 'react';
import { HiOutlineShoppingBag, HiShoppingBag } from 'react-icons/hi2';
import { IoMenu } from "react-icons/io5";
import { GoPerson, GoPersonFill } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import CartDrawer from '../CartDrawer/CartDrawer';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { logga } from '../../assets/Images';
import './Navbar.css';

interface Category {
  _id: string;
  title: string;
  description: string;
}

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const userContext = useContext(UserContext);

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { loggedinUser, logout } = userContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isCartEmpty = cartItemCount === 0;

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    window.scrollTo(0, 0);
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Logga ut',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="navbar-wrapper">
      <div className="discount-container">
        <p>Använd koden 20OFF för 20% rabatt på ditt köp</p>
      </div>
      <div className="navbar-container">
        <div className="menu-button" onClick={() => setMenuOpen(!isMenuOpen)}>
          <IoMenu />
        </div>
        <div className={`links-container ${isMenuOpen ? 'menu-open' : ''} ${isMenuOpen ? 'hidden' : ''}`}>
          <ul>
            {categories.map((category) => (
              <motion.li
                key={category._id}
                className={category.title.toLowerCase() === activeCategory ? 'active' : ''}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <NavLink
                  to={`/${category.title.toLowerCase()}`}
                  onClick={() => {
                    setActiveCategory(
                      activeCategory === category.title.toLowerCase() ? null : category.title.toLowerCase()
                    );
                    setMenuOpen(false);
                  }}
                >
                  {category.title}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="logo-container">
          <h2>
            <NavLink to="/" className="logo-link">
              <img src={logga} alt="" />
            </NavLink>
          </h2>
        </div>
        <div className="icons-container">
          {loggedinUser ? (
            <Dropdown menu={{ items }} trigger={['click']}>
              <NavLink to="#" className="person-icon">
                <GoPersonFill style={{ color: '#89B9AD' }} />
              </NavLink>
            </Dropdown>
          ) : (
            <NavLink to="/login" className="person-icon">
              <GoPerson />
            </NavLink>
          )}
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
