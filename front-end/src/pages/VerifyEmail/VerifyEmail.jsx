import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const verified = query.get('verified');

    if (verified === 'true') {
      toast.success('Successfully registered!');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      toast.error('Email verification failed or is missing.');
    }
  }, [location, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        <div className="spinner"></div>
        <h2>Verifying your email...</h2>
        <p>Please wait while we complete your registration.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

