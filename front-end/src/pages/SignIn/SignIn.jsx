import React from 'react';
import './SignIn.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="signin-page">
      <div className="signin-box">
        <h2>Access Account</h2>
        <p className="subtitle">Access your account to manage your e-scooter services.</p>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Your email address" />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Enter your password" />
        </div>

        <div className="forgot-password">
          <a href="#">Forget your password?</a>
        </div>

        <button className="login-btn">Log In</button>

        <p className="signup-text">
          Need to create an account? <Link to="/signup">sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
