import React from 'react';
import './NavBar.css'; 
import { FaUserCircle } from 'react-icons/fa';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <a href="#" className="home-link">Home</a>
        <a href="#" className="about-link">About</a>
        <button className="icon-button">
        <FaUserCircle style={{ fontSize: '30px', color: '#2f855a' }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;