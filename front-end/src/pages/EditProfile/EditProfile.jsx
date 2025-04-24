import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { FiArrowLeft, FiEyeOff } from "react-icons/fi";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/avatar.png"; 

const EditProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    }));
    navigate("/profile");
  };

  //  Handle image upload
  const handleUpdatePicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  //  Handle delete image
  const handleDeletePicture = () => {
    setUser((prev) => ({
      ...prev,
      profileImage: defaultImage,
    }));
  };

  return (
    <div className="edit-profile-container">
      <div className="header">
        <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2>Edit Profile</h2>
      </div>

      <div className="form-card">
        <div className="profile-section">
          <img src={user.profileImage} alt="Profile" className="profile-img" />
          <div className="picture-buttons">
            <label className="btn-outline">
              Update picture
              <input
                type="file"
                accept="image/*"
                onChange={handleUpdatePicture}
                style={{ display: "none" }}
              />
            </label>
            <button className="btn-outline" onClick={handleDeletePicture}>
              Delete picture
            </button>
          </div>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Input first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Input last name"
              value={formData.lastName}
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
              />
              <FiEyeOff className="eye-icon" />
            </div>
          </div>
        </div>

        <div className="save-btn-wrapper">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
