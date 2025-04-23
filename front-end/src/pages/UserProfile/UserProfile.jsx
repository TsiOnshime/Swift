import React from "react";
import "./UserProfile.css";
import { FaPen } from 'react-icons/fa';
import userProfile from '../../assets/selam.jpg'
import Navbar from "../../components/NavBar";
import { PiMotorcycleBold } from 'react-icons/pi'; 
import { TbRoute } from 'react-icons/tb';
import { FaCoins } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <>
        <Navbar/>
        <div className="profile-container">

          <div className="header-image">
            {/* Background image will be set via CSS */}
          </div>

          <div className="profile-card">
            <img
              src={userProfile}
              alt="User"
              className="profile-pic"
            />
            <h2>Aleme</h2>
            <p>cutiepie@gmail.com</p>
            <button className="edit-btn">Edit Profile <FaPen style={{ marginLeft: '8px' }} /></button>
          </div>

          <div className="stats">
            <div className="stat-box">
            <PiMotorcycleBold size={24} color="#4caf50" />
              <h3>198</h3>
              <p>Total miles driven</p>
            </div>
            <div className="stat-box">
            <TbRoute size={24} color="#2196f3" />
              <h3>5</h3>
              <p>Number of Ride</p>
            </div>
            <div className="stat-box">
            <FaCoins size={24} color="#f4b400" />
              <h3>302</h3>
              <p>Total Tokens</p>
            </div>
          </div>

          <div className="redeem-container">
            <button className="redeem-btn">Redeem Token</button>
          </div>
        </div>
    </>

  );
};

export default UserProfile;
