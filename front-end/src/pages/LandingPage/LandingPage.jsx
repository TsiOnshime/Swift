import React from 'react';
import './LandingPage.css';
import scooterHome from '../../assets/scooterImage.png'
import Navbar from '../../components/NavBar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
    <Navbar/>
     <div className="homepage">
      <div className="homepage-text">
        <h1><span className="highlight">Swift E-Scooter</span></h1>
        <p>Explore your city with ease. Rent an e-scooter today!</p>
        <div className="buttons">
        <Link to="/signup">
        <button className="sign-up">
            <i className="fas fa-user-plus"></i> Sign Up
          </button>
        </Link>
          
        <Link to="/signup">
        <button className="sign-in">
            <i className="fas fa-sign-in-alt"></i> Sign In
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