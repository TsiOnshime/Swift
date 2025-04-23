import React, { useState } from 'react';
import './SignIn.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
  
    // TODO: Send data to backend
    toast.success("Login request sent!");
  };
  
  return (
    <div className="signin-page">
      <div className="signin-box">
        <h2>Access Account</h2>
        <p className="subtitle">Access your account to manage your e-scooter services.</p>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Your email address" value={formData.email} onChange={handleChange} />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>
        </div>

        <div className="forgot-password">
        <Link to="/forgot-password">Forget your password?</Link>
        </div>

        <button className="login-btn" onClick={handleSubmit}>Log In</button>

        <p className="signup-text">
          Need to create an account? <Link to="/signup">sign up</Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      
    </div>
  );
};

export default SignIn;
