import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-success mb-3">404</h1>
        <h2 className="mb-3 fw-semibold text-dark">Page Not Found</h2>
        <p className="lead text-secondary mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-success btn-lg px-4 shadow">
          Go Home
        </Link>
      </div>
      <img
        src="https://i.postimg.cc/3x3QzSGq/404-illustration.png"
        alt="404 Not Found"
        className="img-fluid mt-4"
        style={{ maxWidth: 340, opacity: 0.9 }}
      />
    </div>
  );
}

export default NotFound;