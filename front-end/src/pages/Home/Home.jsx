import React from 'react';
import './Home.css';
import { FaQrcode } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="scan-container">
      <h2 className="scan-title">Scan QR Code to Unlock E-Scooter</h2>
      <ol className="scan-instructions">
        <li>Open the e-scooter website on your smartphone</li>
        <li>Click on the 'Scan QR Code' button from the homepage</li>
        <li>Point your camera at the scooter’s QR code</li>
        <li>The scooter will be automatically unlocked</li>
      </ol>
      <button className="scan-button">
        <FaQrcode className="scan-icon" />
        Scan
      </button>
    </div>
  );
};

export default Home;