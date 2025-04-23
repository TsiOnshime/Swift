import React, { useRef } from 'react';
import './PackageSelection.css';
import packages from '../../data/packages.js';
import Navbar from '../../components/NavBar.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PackageSelection = () => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="package-page">
        <div className="package-container">
          <h2>Choose Package</h2>

          <div className="scroll-buttons">
            <button onClick={scrollLeft}><FaChevronLeft /></button>
            <button onClick={scrollRight}><FaChevronRight /></button>
          </div>

          <div className="package-cards" ref={scrollRef}>
            {packages.map((pkg) => (
              <div className="package-card" key={pkg.id}>
                <div className="pkg-card-element">
                  <img src={pkg.image} alt="Scooter" />
                  <p><strong>Time:</strong> {pkg.time}</p>
                  <p><strong>Payment:</strong> {pkg.price}</p>
                  <button className="select-btn">Select</button>
                </div>
              </div>
            ))}
          </div>

          <div className="package-footer">
            <div className="custom-time">
              <label>Fill Your own time</label>
              <input type="text" placeholder="Time in hours" />
            </div>
            <button className="pay-btn">Pay with Chapa</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageSelection;
