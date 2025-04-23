import React, { useState } from "react";
import "./SignUp.css";
import NavBar from '../../components/NavBar'
import { MdElectricScooter } from 'react-icons/md'; 
import { FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { Link,  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  const { firstName, lastName, email, password } = formData;
  if (!firstName || !lastName || !email || !password) {
    toast.error('Please fill in all fields');
    return;
  }
    toast.success('Successfully registered! Redirecting...');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
    // BACKEND TODO: Send formData to the backend API
    /*
      TODO (backend):
      1. Validate all fields (length, format, email uniqueness, etc.)
      2. Hash the password securely (bcrypt recommended)
      3. Save the user to the database (firstName, lastName, email, hashed password)
      4. Return a success message and possibly a token/session
      5. Handle duplicate emails / server errors
    */
  navigate('/home');
};

const handleSocialClick = (provider) => {
  //  BACKEND TODO: Setup OAuth endpoints
    /*
      TODO (backend):
      1. Configure OAuth for Google and Apple:
         - Google: Client ID + Secret (Google Console)
         - Apple: Sign in with Apple setup
      2. Use Firebase Auth or your backend to handle OAuth tokens
      3. Return user data & auth token from backend
      4. Frontend can use that token to log in the user
    */
  toast.info(`Sign up with ${provider} is coming soon!`);
};

  return (
    <>
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
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Begin your journey</h2>

          <div className="form-group double">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" placeholder="Input first name" value={formData.firstName} onChange={handleChange}/>
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" placeholder="Input last name" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="example.email@gmail.com" value={formData.email} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter at least 8+ characters" value={formData.password} onChange={handleChange}/>
          </div>


          <p className="terms">
            By signing up, I agree with the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
            & <a href="/Privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </p>

          <button type="submit" className="register-btn" >Register</button>
        </form>

          <div className="or-section">OR</div>
           {/* TODO: Connect Google and Apple sign-in with backend or Firebase OAuth */}
          <div className="social-buttons">
            <button className="google" onClick={() => handleSocialClick('Google')}><FcGoogle/></button>
            <button className="apple"  onClick={() => handleSocialClick('Apple')}><FaApple /></button>
          </div>

          <p className="login-link">
            Already have an account? <Link to="/signin">Log in here</Link>
          </p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Register;