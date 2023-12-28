// import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";

import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
        <div className="discount-container">
            <p>Här kommer lite random text om en rabattkod</p>
        </div>
        <div className="navbar-container">
            <div className="logo-container">
                <h2>Poster</h2><span>W</span><IoEarthOutline /><span>rld</span>
            </div>
            <div className="links-container">
                <ul>
                    <li>Natur</li>
                    <li>Djur</li>
                    <li>Botanisk</li>
                    <li>Text</li>
                    <li>Kök</li>
                    <li>Städer</li>
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