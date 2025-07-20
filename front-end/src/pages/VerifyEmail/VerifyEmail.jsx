import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";

const VerifyEmail = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const email = query.get("email");

    if (!token || !email) {
      toast.error("Invalid verification link.");
      setLoading(false);
      return;
    }

    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/users/verify-email?token=${token}&email=${email}`
      )
      .then(() => {
        toast.success("Successfully registered!");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      })
      .catch(() => {
        toast.error("Email verification failed or is missing.");
      })
      .finally(() => setLoading(false));
  }, [location, navigate]);

  return (
    <div className={`d-flex align-items-center justify-content-center min-vh-100 ${isDark ? "bg-dark" : "bg-light"}`}>
      <div
        className={`card shadow-lg border-0 p-4 text-center ${cardBg} animate__animated animate__fadeIn`}
        style={{
          borderRadius: 20,
          minWidth: 340,
          background: isDark
            ? "linear-gradient(135deg, #23272b 70%, #181a1b 100%)"
            : "linear-gradient(to right, #e0f7e9, #d9f3ff)",
        }}
      >
        {loading && (
          <div className="mb-3">
            <div
              className="spinner-border text-success"
              style={{ width: 48, height: 48 }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <h2 className="mb-2" style={{ color: "#1e8847", fontWeight: 700, fontSize: "1.5rem" }}>
          Verifying your email...
        </h2>
        <p className="mb-0" style={{ color: isDark ? "#b2dfc7" : "#555" }}>
          Please wait while we complete your registration.
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VerifyEmail;