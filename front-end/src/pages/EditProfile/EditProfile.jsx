import React, { useState, useEffect, useContext } from "react";
import { FiEyeOff } from "react-icons/fi";
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/edit-profile`,
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
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/profile");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow p-4">
            <div className="d-flex flex-column align-items-center mb-4">
              <img
                src={selectedAvatar}
                alt="User"
                className="rounded-circle mb-2"
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  border: "3px solid #4caf50",
                }}
              />
            </div>
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="Input first name"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Input last name"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="example.email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter at least 8+ characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled
                    />
                    <span className="input-group-text bg-white">
                      <FiEyeOff />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Choose your avatar:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {avatarList.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt={`avatar-${idx}`}
                        className={`rounded-circle border ${
                          selectedAvatar === avatar
                            ? "border-success border-3"
                            : "border-2"
                        }`}
                        style={{
                          width: "60px",
                          height: "60px",
                          cursor: "pointer",
                          objectFit: "cover",
                        }}
                        onClick={() => setSelectedAvatar(avatar)}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-4">
                  <button className="btn btn-success px-4" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
