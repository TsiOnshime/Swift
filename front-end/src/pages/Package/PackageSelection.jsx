import React, { useState, useContext } from "react";
import packages from "../../data/packages.js";
import Navbar from "../../components/NavBar.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDataContext } from "../../context/UserContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import viteLogo from "/vite.svg";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Segoe UI, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "18px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PackageSelection = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [customTime, setCustomTime] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserDataContext);
  const scooterId = localStorage.getItem("scannedQrCode");
  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState("");

  const handlePackageSelect = (id) => {
    setSelectedId(id);
    setShowCardForm(false);
    setCustomTime("");
    toast.success("Package selected successfully!");
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && value.length <= 2)) {
      setCustomTime(value);
    }
  };

  const handleShowCardForm = async () => {
    if (!selectedId) {
      toast.error("Please select a package before proceeding to payment.");
      return;
    }
    const selectedPackage = packages.find((pkg) => pkg.id === selectedId);
    const price = parseInt(selectedPackage.price.replace(/\D/g, ""), 10);
    setLoading(true);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/payments/create-payment-intent`,
        { amount: price, currency: "usd", email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientSecret(res.data.clientSecret);
      setShowCardForm(true);
    } catch (err) {
      toast.error("Payment initiation failed!");
    }
    setLoading(false);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe is not loaded");
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: user.email,
          name: `${user.fullname.firstname} ${user.fullname.lastname}`,
        },
      },
    });
    if (result.error) {
      toast.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      try {
        const selectedPackage = packages.find((pkg) => pkg.id === selectedId);
        const time = customTime || selectedPackage.time;
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/payments/confirm-payment`,
          {
            tx_ref: result.paymentIntent.id,
            amount: parseInt(selectedPackage.price.replace(/\D/g, ""), 10), 
            time,
            scooterId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Payment confirmed and scooter booked!");
      } catch (err) {
        toast.error("Payment confirmation failed!");
      }
    }
    setLoading(false);
  };

  const selectedPackage = packages.find((p) => p.id === selectedId);

return (
  <>
    <Navbar />
    <ToastContainer />
    <div className="bg-light min-vh-100 py-5 mt-5">
      <div className="container">
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-2"
            style={{
              width: 56,
              height: 56,
              background: "#e8f9f1",
              borderRadius: "50%",
            }}
          >
            <img
              src={viteLogo}
              alt="Scooter"
              style={{ width: 32, height: 32 }}
            />
          </div>
          <h2 className="fw-bold mb-2">Choose Your Scooter Package</h2>
          <p
            className="text-secondary mb-0"
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            Select the perfect rental plan that fits your needs and enjoy the
            freedom of exploring the city on our eco-friendly scooters.
          </p>
        </div>
        <div className="row g-4 justify-content-center mb-5">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card h-100 shadow-sm text-center package-card-hover ${
                  selectedId === pkg.id ? "border-success border-3" : ""
                }`}
                style={{
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  boxShadow:
                    selectedId === pkg.id
                      ? "0 0 0 0.35rem #19875433"
                      : undefined,
                  background: selectedId === pkg.id ? "#f6fff9" : "#fff",
                  transform:
                    selectedId === pkg.id
                      ? "translateY(-6px) scale(1.03)"
                      : "none",
                  zIndex: selectedId === pkg.id ? 2 : 1,
                }}
                onClick={() => handlePackageSelect(pkg.id)}
                tabIndex={0}
                onKeyPress={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  handlePackageSelect(pkg.id)
                }
                aria-pressed={selectedId === pkg.id}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <div
                    className="bg-success bg-opacity-10 rounded-circle mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: 64, height: 64 }}
                  >
                    <img
                      src={viteLogo}
                      alt="icon"
                      style={{ width: 36, height: 36 }}
                    />
                  </div>
                  <h3 className="card-title fw-bold">{pkg.name}</h3>
                  <p className="text-secondary mb-1">{pkg.time}</p>
                  <div className="fw-bold fs-3 text-success mb-2">
                    {pkg.price}
                  </div>
                  <ul className="list-unstyled mb-3" style={{ minHeight: 90 }}>
                    {pkg.features &&
                      pkg.features.map((f, i) => (
                        <li key={i} className="text-success">
                          ✓ <span className="text-dark">{f}</span>
                        </li>
                      ))}
                  </ul>
                  <button
                    className={`btn btn-outline-success w-100 ${
                      selectedId === pkg.id ? "active" : ""
                    }`}
                    disabled={selectedId === pkg.id}
                    type="button"
                  >
                    {selectedId === pkg.id ? "Selected" : "Select Package"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedId && (
          <div className="text-center mb-4">
            <p className="mb-3">
              <span className="badge bg-success bg-opacity-75 fs-6 mb-2">
                Selected
              </span>
              <br />
              <b>{selectedPackage.name}</b> package
            </p>
            {/* Show custom time input if package allows */}
            {selectedPackage && selectedPackage.allowCustomTime && (
              <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="customTime" className="form-label fw-semibold">
                  Enter custom time (minutes):
                </label>
                <input
                  id="customTime"
                  type="number"
                  min="1"
                  max="99"
                  className="form-control w-auto text-center"
                  value={customTime}
                  onChange={handleTimeChange}
                  placeholder="e.g. 15"
                  style={{ fontSize: "1.2rem" }}
                />
              </div>
            )}
            {!showCardForm && (
              <button
                className="btn btn-success btn-lg px-5"
                onClick={handleShowCardForm}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            )}
          </div>
        )}
        {showCardForm && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0 p-4">
                <h4 className="mb-3 text-success text-center">
                  Payment Details
                </h4>
                <form onSubmit={handlePay}>
                  <div className="mb-3">
                    <CardElement options={cardStyle} />
                  </div>
                  <button
                    className="btn btn-success w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      "Confirm Payment"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <style>{`
      .package-card-hover:hover, .package-card-hover:focus {
        box-shadow: 0 0 0 0.35rem #19875433, 0 4px 16px rgba(0,0,0,0.13);
        border-color: #198754 !important;
        background: #f6fff9;
        transform: translateY(-6px) scale(1.03);
        z-index: 2;
      }
    `}</style>
  </>
);
};

export default PackageSelection;