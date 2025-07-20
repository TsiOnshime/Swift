import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/forgot-password`, { email });
      toast.success("Reset link sent! Check your inbox.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        className="bg-white p-4 rounded-4 shadow"
        style={{ maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-success fw-bold">
          Reset Your Password
        </h2>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100">
          Send Reset Link
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgotPassword;
