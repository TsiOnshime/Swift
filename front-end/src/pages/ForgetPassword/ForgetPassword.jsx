import React, { useState } from 'react';
import './ForgetPassword.css';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    // BACKEND: Call API to send password reset email
    try {
      // Placeholder: Replace with actual API call
      toast.success("Reset link sent! Check your inbox.");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="forgot-password-page">
      <form className='forget-form' onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <input
        className='forget-input'
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className='forget-btn'>Send Reset Link</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgotPassword;
