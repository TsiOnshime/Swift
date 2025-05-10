import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Landing.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import MobileLanding from "../MobileLanding/MobileLanding";
import { useTheme } from "../../context/ThemeContext";

function Landing() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 700;
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://i.postimg.cc/jdG35bqk/backround1.jpg",
    "https://i.postimg.cc/GttgB3s6/background4.jpg",
    "https://i.postimg.cc/j21gyVH2/background5.jpg",
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      alert(
        "To install the app, use your browser's menu and select 'Add to Home Screen'."
      );
    }
  };

  if (isMobile) {
    return <MobileLanding />;
  }

  return (
    <div className={`landing-page mt-5 ${theme === "dark" ? "dark-mode" : ""}`}>
      <Header />
      <header
        className={`Landing d-flex align-items-center ${
          isDark ? "bg-dark text-light" : ""
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          minHeight: "60vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1 className="hero-title mb-3">
                <span className="swift">Swift Mobility</span>
              </h1>
              <p className="hero-subtitle mb-4">
                <span className="swift" id="mob-sub">
                  Redefining Urban Transport with
                </span>
                <span className="mobility" id="swi-sub">
                  {" "}
                  AI and Web3 Innovation
                </span>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 hero-actions">
                <a href="#learn-more" className="btn btn-success px-4">
                  Learn more
                </a>
                <Link to="/signup" className="btn btn-outline-success px-4">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Why Choose Section */}
      <section
        className="why-choose"
        id="learn-more"
        style={
          isDark
            ? {
                background:
                  "linear-gradient(135deg, #23272b 70%, #181a1b 100%)",
              }
            : undefined
        }
      >
        <div
          className="why-choose-inner"
          style={
            isDark
              ? {
                  background: "rgba(24,26,27,0.98)",
                  color: "#fff",
                }
              : undefined
          }
        >
          <h2 className="section-title" style={isDark ? { color: "#fff" } : {}}>
            Why Choose Swift Scoot?
          </h2>
          <p
            className="section-description"
            style={isDark ? { color: "#b6f5d8" } : {}}
          >
            Our electric scooters provide an eco-friendly alternative to
            traditional transportation, helping reduce carbon emissions while
            offering convenience and style.
          </p>
          <div className="features">
            <div
              className={`feature${isDark ? " glow-card" : ""}`}
              style={
                isDark
                  ? {
                      background: "rgba(24,26,27,0.98)",
                      color: "#fff",
                      border: "2px solid #34bb78",
                      boxShadow:
                        "0 0 16px 2px #34bb78, 0 0 32px 4px #2ebd7f, 0 1.5px 8px rgba(44,62,80,0.13)",
                    }
                  : undefined
              }
            >
              <div
                className="feature-number"
                style={
                  isDark ? { background: "#34bb78", color: "#fff" } : undefined
                }
              >
                <img
                  src="https://i.postimg.cc/CM99ZDmN/leaf.png"
                  alt="leaf-icon"
                  style={{ width: 32, height: 32 }}
                />
              </div>
              <h3
                className="feature-title"
                style={isDark ? { color: "#fff" } : {}}
              >
                Eco-Friendly
              </h3>
              <p
                className="feature-description"
                style={isDark ? { color: "#b6f5d8" } : {}}
              >
                Zero emissions transportation that helps reduce your carbon
                footprint and keeps our cities clean.
              </p>
            </div>
            <div
              className={`feature${isDark ? " glow-card" : ""}`}
              style={
                isDark
                  ? {
                      background: "rgba(24,26,27,0.98)",
                      color: "#fff",
                      border: "2px solid #34bb78",
                      boxShadow:
                        "0 0 16px 2px #34bb78, 0 0 32px 4px #2ebd7f, 0 1.5px 8px rgba(44,62,80,0.13)",
                    }
                  : undefined
              }
            >
              <div
                className="feature-number"
                style={
                  isDark ? { background: "#34bb78", color: "#fff" } : undefined
                }
              >
                <img
                  src="https://i.postimg.cc/XJJkLH7C/flash.png"
                  alt="flash-icon"
                  style={{ width: 32, height: 32 }}
                />
              </div>
              <h3
                className="feature-title"
                style={isDark ? { color: "#fff" } : {}}
              >
                Powerful Performance
              </h3>
              <p
                className="feature-description"
                style={isDark ? { color: "#b6f5d8" } : {}}
              >
                Long-lasting battery life and impressive speed capabilities to
                get you where you need to go.
              </p>
            </div>
            <div
              className={`feature${isDark ? " glow-card" : ""}`}
              style={
                isDark
                  ? {
                      background: "rgba(24,26,27,0.98)",
                      color: "#fff",
                      border: "2px solid #34bb78",
                      boxShadow:
                        "0 0 16px 2px #34bb78, 0 0 32px 4px #2ebd7f, 0 1.5px 8px rgba(44,62,80,0.13)",
                    }
                  : undefined
              }
            >
              <div
                className="feature-number"
                style={
                  isDark ? { background: "#34bb78", color: "#fff" } : undefined
                }
              >
                <img
                  src="https://i.postimg.cc/Vkqgk0Vd/smartphone.png"
                  alt="smartphone-icon"
                  style={{ width: 32, height: 32 }}
                />
              </div>
              <h3
                className="feature-title"
                style={isDark ? { color: "#fff" } : {}}
              >
                Smart Technology
              </h3>
              <p
                className="feature-description"
                style={isDark ? { color: "#b6f5d8" } : {}}
              >
                Connect to our app to track your rides, monitor battery life,
                and access available scooters nearby.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-description">
          Getting started with Swift E-Scooter is easy! Follow these simple
          steps to begin your eco-friendly journey.
        </p>
        <div className="steps-table">
          <div className="step-column">
            <div className="step-number">1</div>
            <h3 className="step-title">Sign Up</h3>
            <p className="step-description">
              Create your account in our mobile app or website.
            </p>
          </div>
          <div className="step-column">
            <div className="step-number">2</div>
            <h3 className="step-title">Locate</h3>
            <p className="step-description">
              Find available scooters near you using our app.
            </p>
          </div>
          <div className="step-column">
            <div className="step-number">3</div>
            <h3 className="step-title">Unlock</h3>
            <p className="step-description">
              Scan the QR code to unlock your scooter.
            </p>
          </div>
          <div className="step-column">
            <div className="step-number">4</div>
            <h3 className="step-title">Ride & Return</h3>
            <p className="step-description">
              Enjoy your ride and return the scooter when finished.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`cta-section py-5 ${isDark ? "bg-dark text-light" : ""}`}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-8 mb-4 mb-md-0">
              <h2 className="display-6 fw-bold">Ready to Get Started?</h2>
              <p className="lead mb-0">
                Join thousands of satisfied users who have made the switch to
                eco-friendly urban mobility. Sign up today and get your first
                ride free!
              </p>
            </div>
            <div className="col-md-4 text-md-end text-center mt-4 mt-md-0">
              <button
                className="btn btn-success btn-lg px-4 fw-bold"
                onClick={handleInstallClick}
                style={{
                  background:
                    "linear-gradient(90deg, #2ebd7f 60%, #258555 100%)",
                  border: "none",
                  color: "#fff",
                }}
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
