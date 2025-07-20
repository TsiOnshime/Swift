import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserDataContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`${isDark ? "bg-dark" : "bg-light"} min-vh-100 d-flex align-items-center justify-content-center`}>
      <div className={`card shadow-lg border-0 p-4 ${isDark ? "bg-dark text-light" : ""}`} style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="fw-bold text-success text-center mb-2">Access Account</h2>
        <p className={`text-center mb-4 ${isDark ? "text-light" : "text-secondary"}`} style={{ fontSize: "0.95rem" }}>
          Access your account to manage your e-scooter services.
        </p>
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
              { email, password }
            );
            if (response.status === 200) {
              const data = response.data;
              setUser(data.user);
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              navigate('/home');
            }
            setEmail('');
            setPassword('');
          } catch (err) {
            toast.error(
              err.response?.data?.message ||
              err.response?.data?.errors?.[0]?.msg ||
              "Login failed"
            );
          }
        }} autoComplete="off">
          <div className="mb-3 position-relative">
            <span className={`position-absolute top-50 translate-middle-y ms-3 ${isDark ? "text-light" : "text-secondary"}`}>
              <FaEnvelope />
            </span>
            <input
              type="email"
              className={`form-control ps-5 ${isDark ? "bg-dark text-light border-secondary" : ""}`}
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <span className={`position-absolute top-50 translate-middle-y ms-3 ${isDark ? "text-light" : "text-secondary"}`}>
              <FaLock />
            </span>
            <input
              type="password"
              className={`form-control ps-5 ${isDark ? "bg-dark text-light border-secondary" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-success text-decoration-none small">
              Forget your password?
            </Link>
          </div>
          <button className="btn btn-success w-100 fw-bold py-2" type="submit">
            Log In
          </button>
        </form>
        <p className={`mt-4 text-center ${isDark ? "text-light" : "text-secondary"}`} style={{ fontSize: "0.95rem" }}>
          Need to create an account?
          <Link to="/signup" className="text-success fw-semibold text-decoration-underline ms-1">
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignIn;