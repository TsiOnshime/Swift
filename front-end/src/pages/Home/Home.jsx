import React, { useState } from "react";
import "./Home.css";
import { FaQrcode } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success("QR code scanned! Scooter unlocking...");

      //  BACKEND - Send scanned QR code to backend to validate scooter ID
      //  BACKEND - Backend should respond with scooter status (available, in use, etc.)
      //  BACKEND - If valid, trigger unlock command via backend to scooter firmware API
    }, 2000);
  };

  return (
    <div className="scan-container">
      <h2 className="scan-title">Scan QR Code to Unlock E-Scooter</h2>
      <ol className="scan-instructions">
        <li>Open the e-scooter website on your smartphone</li>
        <li>Click on the 'Scan QR Code' button from the homepage</li>
        <li>Point your camera at the scooter’s QR code</li>
        <li>The scooter will be automatically unlocked</li>
      </ol>

      <button
        className="scan-button"
        onClick={handleScan}
        disabled={isScanning}
      >
        {isScanning ? (
          <span className="scanning-text">Scanning...</span>
        ) : (
          <>
            <FaQrcode className="scan-icon" />
            Scan
          </>
        )}
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
