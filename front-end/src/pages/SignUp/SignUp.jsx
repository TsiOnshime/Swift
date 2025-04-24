import React, { useState, useContext } from "react";
import "./SignUp.css";
import { MdElectricScooter } from 'react-icons/md'; 
import { FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { Link,  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserDataContext } from "../../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/signin");
      }
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed"
      );
    }
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
              <input
                id="firstName"
                type="text"
                placeholder="Input first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Input last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example.email@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter at least 8+ characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>


          <p className="terms">
            By signing up, I agree with the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
            & <a href="/Privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </p>

          <button type="submit" className="register-btn" >Register</button>
        </form> 
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