// import React from 'react'
import "./Footer.css"
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
        <div className="info-section">
          <h2>Besök oss</h2>
          <p>Djurgårdsvägen 6</p>
          <p>115 93 Stockholm</p>
        </div>
        <div className="links-section">
          <h2>Kundservice</h2>
          <p>Kontakta oss</p>
          <p>Vanliga frågor</p>
          <p>Köpvillkor</p>
        </div>
        <div className="socials-section">
          <h2>Sociala medier</h2>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
        </div>
    </div>
  )
}

export default Footer