import React, { useRef, useState } from 'react';
import './PackageSelection.css';
import packages from '../../data/packages.js';
import Navbar from '../../components/NavBar.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PackageSelection = () => {
  const scrollRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [customTime, setCustomTime] = useState('');

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  const handlePackageSelect = (id) => {
    setSelectedId(id);
    toast.success('Package selected successfully!');
    // Send selected package ID to backend to store or process user's choice
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value.length <= 2)) {
      setCustomTime(value);
    }
  };

  const handlePay = () => {
    // Send selected package ID or customTime to backend for payment processing
    // connecting to Chapa API from the backend
    toast.info('Payment feature not implemented yet.');
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="package-page">
        <div className="package-container">
          <h2>Choose Package</h2>

          <div className="scroll-buttons">
            <button onClick={scrollLeft}><FaChevronLeft /></button>
            <button onClick={scrollRight}><FaChevronRight /></button>
          </div>

          <div className="package-cards" ref={scrollRef}>
          {packages.map((pkg) => (
              <div
                className={`package-card ${selectedId === pkg.id ? 'selected' : ''}`}
                key={pkg.id}
              >
                <div className="pkg-card-element">
                  <img src={pkg.image} alt={`Scooter ${pkg.id}`} />
                  <p>Time: {pkg.time}</p>
                  <p>Payment: {pkg.price}</p>
                  <button
                    className="select-btn"
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    {selectedId === pkg.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="package-footer">
            <div className="custom-time">
              <label>Fill Your own time</label>
              <input
                type="number"
                id="customTime"
                placeholder="Time in hours"
                value={customTime}
                onChange={handleTimeChange}
                min="1"
                max="24"
              />
            </div>
            <button className="pay-btn" onClick={handlePay}>Pay with Chapa</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageSelection;
