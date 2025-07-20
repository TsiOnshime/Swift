import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import { useTheme } from "../context/ThemeContext";
import { FaUserCircle, FaCoins, FaMoon, FaSun } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navBgClass =
    theme === "dark" ? "bg-dark navbar-dark" : "bg-white navbar-light";
  const textClass = theme === "dark" ? "text-light" : "text-secondary";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav
      className={`navbar navbar-expand-md shadow-sm fixed-top py-2 px-3 mb-4 ${navBgClass}`}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={viteLogo}
            alt="Vite Logo"
            style={{ width: 36, height: 36, verticalAlign: "middle" }}
            className="me-2"
          />
          <span className={`fw-bold ${textClass}`}>Swift Mobility</span>
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu */}
        <div
          className={`offcanvas offcanvas-end ${
            theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
          }`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className={`offcanvas-header ${navBgClass}`}>
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              {/* Home Link */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${textClass}${
                    location.pathname === "/home" ? " active" : ""
                  }`}
                  to="/home"
                >
                  Home
                </Link>
              </li>

              {/* Map Link */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${textClass}${
                    location.pathname === "/map" ? " active" : ""
                  }`}
                  to="/map"
                >
                  Map
                </Link>
              </li>
              {/* Profile Dropdown */}
              <li className="nav-item dropdown position-relative">
                <button
                  className={`btn dropdown-toggle ${textClass}`}
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaUserCircle style={{ fontSize: "1.8rem" }} />
                </button>
                <ul
                  className="dropdown-menu position-absolute"
                  style={{
                    top: "100%",
                    right: "100%", // Change from left to right
                    left: "auto",  // Ensure left is auto
                    zIndex: 1050,
                  }}
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-packages">
                      My Packages
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>

              {/* Coin Dropdown */}
              <li className="nav-item dropdown position-relative">
                <button
                  className={`btn dropdown-toggle ${textClass}`}
                  id="coinDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaCoins style={{ fontSize: "1.6rem", color: "#f4b400" }} />
                </button>
                <ul
                  className="dropdown-menu position-absolute"
                  style={{
                    top: "100%",
                    right: "100%", // Change from left to right
                    left: "auto",  // Ensure left is auto
                    zIndex: 1050,
                  }}
                  aria-labelledby="coinDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/redeem">
                      Redeem Tokens
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/send-tokens">
                      Send Tokens
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Theme Toggle Button */}
              <li className="nav-item">
                <button
                  className="btn btn-light"
                  onClick={toggleTheme}
                  style={{
                    fontSize: "1.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    borderRadius: "50%",
                    padding: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <FaMoon
                      style={{
                        color: "#6c63ff",
                        filter: "drop-shadow(0 0 4px #b3aaff)",
                      }}
                    />
                  ) : (
                    <FaSun
                      style={{
                        color: "#FFD600",
                        filter: "drop-shadow(0 0 4px #ffe066)",
                      }}
                    />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;