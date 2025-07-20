import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { FaPen, FaCoins } from 'react-icons/fa';
import Navbar from "../../components/NavBar";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useTokenBalance } from "../../utils/fetchBalance";
import { useTheme } from "../../context/ThemeContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const UserProfile = () => {
   const { theme } = useTheme();

   // Helper for theme classes
   const isDark = theme === "dark";
   const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tokenBalance = useTokenBalance();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <>
      <Navbar />
      <div className={`container-fluid profile-bg py-5${isDark ? " bg-dark" : ""}`} style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4 mt-4">
              <div className="header-image rounded-top-4"></div>
              <div className="card-body text-center position-relative" style={{ marginTop: "-60px" }}>
                <img
                  src="/src/assets/avatars/avatar0.png"
                  
                  alt="User"
                  className="profile-pic border border-3 border-white shadow"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    marginTop: "-60px",
                    background: "#e8f9f1"
                  }}
                />
                <h2 className="fw-bold mt-3 mb-1" style={{ fontSize: "2rem", color: "#164f32" }}>
                  {profile.fullname?.firstname} {profile.fullname?.lastname}
                </h2>
                <p className="mb-2 text-secondary">{profile.email}</p>
                <Link to="/edit-profile">
                  <button className="btn btn-outline-success rounded-pill px-4 py-2 mb-3">
                    Edit Profile <FaPen className="ms-2" />
                  </button>
                </Link>
                <div className="d-flex justify-content-center my-3">
                  <WalletMultiButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;