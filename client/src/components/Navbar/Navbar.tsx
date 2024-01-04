import React, { useState, useEffect } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Navbar.css"

// Detta är Headern

interface Category {
    _id: string,
    title: string,
    description: string;
}

const Navbar: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

        fetchCategories();
    }, []);

    
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
                    className={category.title.toLowerCase() === activeCategory ? "active" : ""}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <Link
                        to={`/${category.title.toLowerCase()}`}
                        onClick={() => setActiveCategory(category.title.toLowerCase())}
                        >
                        {category.title}
                    </Link>
                </motion.li>
            ))}
                </ul>
            </div>
            <div className="icons-container">
                <GoPerson />
                <HiOutlineShoppingBag />
            </div>
        </div>
    </div>
  )
}

export default Navbar