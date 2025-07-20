import React from "react";
import { FaQrcode } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const stepBg = isDark ? "bg-dark text-light border-secondary" : "bg-white text-dark border-light";

  return (
    <>
      <Navbar />
      <div className={`container-fluid min-vh-100 mt-5 pt-3 ${bgClass}`}>
        {/* === HERO SECTION === */}
        <section className="text-center py-4">
          <h2 className="fw-bold mb-2">Unlock Your E-Scooter</h2>
          <p className="subtitle mb-4">Quick and easy – just scan and go!</p>
          <img
            className="img-fluid rounded-3 shadow mb-4"
            style={{ maxWidth: 400 }}
            src="https://i.postimg.cc/vHZBqJWT/scooter-qrcode.jpg"
            alt="QR Scan Illustration"
          />
          <div>
            <button
              className="btn btn-success btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2"
              onClick={() => navigate("/scanner")}
            >
              <FaQrcode className="scan-icon" />
              Scan
            </button>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section className="py-5">
          <h3 className="fw-bold text-center mb-4">How It Works</h3>
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                {[
                  {
                    title: "Open the e-scooter website",
                    text: "Access our website on your smartphone to begin the unlocking process.",
                  },
                  {
                    title: "Click on the 'Scan QR Code' button",
                    text: "Tap the scan button from the homepage to activate your device’s camera.",
                  },
                  {
                    title: "Point your camera at the scooter’s QR code",
                    text: "Align your camera with the QR code located on the e-scooter handlebar.",
                  },
                  {
                    title: "The scooter will be automatically unlocked",
                    text: "Once the QR code is recognized, the scooter will unlock and you’re ready to ride!",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-start rounded-3 shadow-sm p-3 ${stepBg}`}
                    style={{ transition: "background-color 0.3s, color 0.3s" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        background: isDark ? "#28c28b" : "#1e6642",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <strong>{item.title}</strong>
                      <p className="mb-0">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6 text-center">
              <img
                className="img-fluid rounded-4 shadow"
                style={{ maxWidth: 400, height: "auto" }}
                src="https://i.postimg.cc/Z59qZ6sh/phone-scanning-scooter.jpg"
                alt="Phone Scanning QR"
              />
            </div>
          </div>
        </section>

        {/* === CALL TO ACTION === */}
        <section className="text-center py-5">
          <h3 className="fw-bold mb-3">Ready to Start Your Eco-Friendly Journey?</h3>
          <p className="mb-4">
            Join thousands of riders who are already enjoying our convenient,
            sustainable e-scooters for their daily commute.
          </p>
          <button
            className="btn btn-success btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2"
            onClick={() => navigate("/scanner")}
          >
            <FaQrcode className="scan-icon" />
            Scan Now
          </button>
        </section>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;