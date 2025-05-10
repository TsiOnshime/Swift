import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/reset-password`, {
        email,
        token,
        newPassword,
      });
      toast.success("Password reset successful! Please login.");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="bg-white p-4 rounded-4 shadow text-center">
          <h2 className="mb-4 text-danger fw-bold">Invalid or expired reset link.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        className="bg-white p-4 rounded-4 shadow"
        style={{ maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-success fw-bold">
          Set New Password
        </h2>
        <input
          className="form-control mb-3"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ResetPassword;