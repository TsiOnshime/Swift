import React, { useState, useEffect, useContext } from "react";
import "./EditProfile.css";
import { FiArrowLeft, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import axios from "axios";

const avatarList = [
  "/src/assets/avatars/avatar0.png",
  "/src/assets/avatars/avatar1.jpg",
  "/src/assets/avatars/avatar2.jpg",
  "/src/assets/avatars/avatar3.jpg",
  "/src/assets/avatars/avatar4.jpg",
  "/src/assets/avatars/avatar5.jpg",
  "/src/assets/avatars/avatar6.jpg",
];

const EditProfile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Pre-fill the form with user data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0]);

  useEffect(() => {
    setFormData({
      firstname: user?.fullname?.firstname || "",
      lastname: user?.fullname?.lastname || "",
      email: user?.email || "",
      password: "",
    });
    setSelectedAvatar(user?.profileImage || avatarList[0]);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/edit-profile`,
        {
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          email: formData.email,
          profileImage: selectedAvatar,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUser(res.data); // Update context with new user data
      navigate("/profile");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="header">
        <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2>Edit Profile</h2>
      </div>

      <div className="form-card">
        <div className="profile-section">
          <img
            src={selectedAvatar}
            alt="User"
            className="profile-pic"
          />
        </div>

        <form className="form-fields" onSubmit={handleSave}>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Input first name"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Input last name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example.email@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Password</label>
            <div className="password-input">
              <input
                type="password"
                name="password"
                placeholder="Enter at least 8+ characters"
                value={formData.password}
                onChange={handleChange}
                disabled
              />
              <FiEyeOff className="eye-icon" />
            </div>
          </div>

          <div className="avatar-selection">
            <label>Choose your avatar:</label>
            <div className="avatar-list">
              {avatarList.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt={`avatar-${idx}`}
                  className={`avatar-img ${selectedAvatar === avatar ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    border: selectedAvatar === avatar ? "2px solid #4caf50" : "2px solid transparent",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    margin: "0 8px"
                  }}
                />
              ))}
            </div>
          </div>

          <div className="save-btn-wrapper">
            <button className="save-btn" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
