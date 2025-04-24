import React  from 'react';
import './NavBar.css'; 
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <Link to="/home" className="home-link">Home</Link>
        <Link to="/about" className="about-link">About</Link>
        <Link to="/map" className="map-link">Map</Link>
        
        <Link to="/profile" className="icon-button">
        <FaUserCircle style={{ fontSize: '30px', color: '#2f855a' }} />
      </Link>

      </div>
    </nav>
  );
};

export default Navbar;