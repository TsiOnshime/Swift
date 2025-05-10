import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const qrCode = localStorage.getItem("scannedQrCode");

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="bg-light rounded-4 shadow p-4 text-center" style={{ maxWidth: 400, width: "100%" }}>
        <FaCheckCircle color="#38a169" size={80} className="mb-3" />
        <h2 className="text-success fw-bold mt-3 mb-2">Payment Successful!</h2>
        <p className="fs-5 mb-3 text-secondary">
          Your scooter <b className="text-primary">{qrCode}</b> is now{" "}
          <span className="text-success">unlocked</span> and ready to use.
        </p>
        <button
          className="btn btn-success px-4 py-2 fw-semibold"
          onClick={() => navigate("/map")}
        >
          Go to Map
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;