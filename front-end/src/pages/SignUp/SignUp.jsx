import React from "react";
import "./SignUp.css";
import NavBar from '../../components/NavBar'
import { MdElectricScooter } from 'react-icons/md'; // Material Design
import { FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
    <NavBar/>
    <div className="register-container">
      <div className="left-section">
      <Link to="/">
      <FaArrowLeft style={{ cursor: 'pointer' }} />
      </Link>
      
        <div className="content">
          <h2>Let's Get Started</h2>
          <MdElectricScooter style={{ fontSize: '160px', color: 'green' }} />


        </div>
      </div>

      <div className="right-section">
        <form className="form-box">
          <h2>Begin your journey</h2>

          <div className="form-group double">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" placeholder="Input first name" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" placeholder="Input last name" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="example.email@gmail.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter at least 8+ characters" />
          </div>


          <p className="terms">
            By signing up, I agree with the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
          </p>

          <button type="submit" className="register-btn">Register</button>

          <div className="or-section">OR</div>

          <div className="social-buttons">
            <button className="google"><FcGoogle/></button>
            <button className="apple"><FaApple /></button>
          </div>

          <p className="login-link">
            Already have an account? <Link to="/signin">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
    
    </>
    
    
  );
};

export default Register;