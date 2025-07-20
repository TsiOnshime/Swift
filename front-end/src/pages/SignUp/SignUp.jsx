import React, { useState, useContext } from "react";
import { MdElectricScooter } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-dark text-light" : "bg-white text-dark";
  const leftBg = isDark ? "bg-success bg-opacity-75 text-light" : "bg-success bg-gradient text-white";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const { publicKey } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publicKey) {
      toast.error("Please connect your wallet.");
      return;
    }
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      walletAddress: publicKey.toString(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.info(
          "Verify your email. A confirmation has been sent to your email address."
        );
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
      <div className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center ${isDark ? "bg-dark" : "bg-light"}`}>
        <div className={`row w-100 shadow rounded-4 overflow-hidden ${cardBg}`} style={{ maxWidth: 950 }}>
          {/* Left Section */}
          <div className={`col-md-5 d-none d-md-flex flex-column align-items-center justify-content-center ${leftBg} p-4`}>
            <div className="text-center w-100">
              <h2 className="fw-bold mb-4" style={{ letterSpacing: 1 }}>Let's Get Started</h2>
              <MdElectricScooter style={{ fontSize: "8rem", color: "#fff" }} />
            </div>
          </div>
          {/* Right Section */}
          <div className={`col-12 col-md-7 d-flex flex-column justify-content-center align-items-center p-4 ${cardBg}`}>
            <form
              className="w-100"
              style={{ maxWidth: 400 }}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h2 className="fw-bold mb-4 text-success text-center">Begin your journey</h2>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={`form-control ${isDark ? "bg-dark text-light border-secondary" : ""}`}
                    placeholder="Input first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={`form-control ${isDark ? "bg-dark text-light border-secondary" : ""}`}
                    placeholder="Input last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${isDark ? "bg-dark text-light border-secondary" : ""}`}
                  placeholder="example.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`form-control ${isDark ? "bg-dark text-light border-secondary" : ""}`}
                  placeholder="Enter at least 8+ characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="mb-3">
                <WalletMultiButton className="w-100" />
              </div>
              <p className={`small mb-3 ${isDark ? "text-light" : "text-secondary"}`}>
                By signing up, I agree with the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-success text-decoration-underline">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a href="/Privacy" target="_blank" rel="noopener noreferrer" className="text-success text-decoration-underline">
                  Privacy Policy
                </a>
              </p>
              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-bold"
                disabled={!publicKey}
              >
                Register
              </button>
            </form>
            <p className={`mt-3 text-center ${isDark ? "text-light" : ""}`}>
              Already have an account?{" "}
              <Link to="/signin" className="text-success fw-semibold text-decoration-underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Register;