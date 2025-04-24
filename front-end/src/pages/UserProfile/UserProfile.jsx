import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { PiMotorcycleBold } from "react-icons/pi";
import { TbRoute } from "react-icons/tb";
import { FaCoins, FaPen } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../../context/UserContext"; 

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Use user from context

  const [rides, setRides] = useState([]);

  // Fetch rides from backend
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rides"); // Your backend URL
        setRides(response.data);
      } catch (error) {
        console.error("Failed to fetch rides:", error);
        toast.error("Failed to load ride data.");
      }
    };

    fetchRides();
  }, []);

  // Calculate stats from fetched rides
  const totalMiles = rides.reduce((sum, ride) => sum + ride.distance, 0);
  const totalRides = rides.length;
  const totalTokens = rides.reduce((sum, ride) => sum + ride.tokensEarned, 0);

  // Update context user with token info
  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      tokens: totalTokens,
    }));
  }, [totalTokens, setUser]);

  const handleRedeem = () => {
    if (user.tokens >= 100) {
      setUser((prev) => ({
        ...prev,
        tokens: prev.tokens - 100,
      }));
      toast.success("100 tokens redeemed!");
    } else {
      toast.info("You need at least 100 tokens to redeem.");
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="profile-container">
        <div className="header-image" />

        <div className="profile-card">
          <img src={user.profileImage} alt="User" className="profile-pic" />
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.email}</p>
          <button className="edit-btn" onClick={handleEditProfile}>
            Edit Profile <FaPen style={{ marginLeft: '8px' }} />
          </button>
        </div>

        <div className="stats">
          <div className="stat-box">
            <PiMotorcycleBold size={24} color="#4caf50" />
            <h3>{totalMiles}</h3>
            <p>Total miles driven</p>
          </div>
          <div className="stat-box">
            <TbRoute size={24} color="#2196f3" />
            <h3>{totalRides}</h3>
            <p>Number of Rides</p>
          </div>
          <div className="stat-box">
            <FaCoins size={24} color="#f4b400" />
            <h3>{user.tokens}</h3>
            <p>Total Tokens</p>
          </div>
        </div>

        <div className="redeem-container">
          <button className="redeem-btn" onClick={handleRedeem}>
            Redeem Token
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
