import React from "react";
import { Link, useLocation } from "react-router-dom";
import viteLogo from "/vite.svg";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Set Bootstrap classes for dark/light mode
  const navBgClass = theme === "dark" ? "bg-dark navbar-dark" : "bg-white navbar-light";
  const textClass = theme === "dark" ? "text-light" : "text-secondary";

  return (
    <nav className={`navbar navbar-expand-md shadow-sm fixed-top py-2 px-3 mb-4 ${navBgClass}`}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={viteLogo}
            alt="Vite Logo"
            style={{ width: 36, height: 36, verticalAlign: "middle" }}
            className="me-2"
          />
          <span className={`fw-bold ${textClass}`}>Swift Mobility</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link
                className={`nav-link ${textClass}${location.pathname === "/" ? " active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${textClass}${location.pathname === "/about" ? " active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">
                <button className="btn btn-success ms-2 px-3">Sign Up</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin">
                <button className="btn btn-outline-success ms-2 px-3">
                  Sign In
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light ms-2"
                onClick={toggleTheme}
                style={{ fontSize: "1.2rem" }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;