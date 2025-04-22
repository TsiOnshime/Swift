import React from 'react';
import './LandingPage.css';
import scooterHome from '../../assets/scooterImage.png'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
     <div className="homepage">
      <div className="homepage-text">
        <h1><span className="highlight">Swift E-Scooter</span></h1>
        <p>Explore your city with ease. Rent an e-scooter today!</p>
        <div className="buttons">
        <Link to="/signup">
          <button className="sign-up">
            <FaUserPlus /> Sign Up
          </button>
        </Link>

        <Link to="/signin">
          <button className="sign-in">
            <FaSignInAlt /> Sign In
          </button>
        </Link>

 
        </div>
      </div>
      <div className="homepage-image">
        <div className="image-bg"></div>
        <img src={scooterHome } alt="E-Scooter" className="main-img" />
      </div>
    </div>
    </>
   
  );
};

export default LandingPage;