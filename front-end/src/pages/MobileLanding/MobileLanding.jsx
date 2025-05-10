import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const scooterImg =
  "https://i.postimg.cc/Fzq2xkyj/scooter-Image.png";

const MobileLanding = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light";
  const howItWorksBg = isDark ? "bg-secondary text-light" : "bg-white";
  const howItWorksTitle = isDark ? "text-success" : "text-success";

  return (
    <div className={`min-vh-100 w-100 ${bgClass}`}>
      {/* Nav Bar */}
      <Header />

      {/* Main Content */}
      <div className="container pt-5 pb-4">
        {/* Hero Section */}
        <div className="text-center my-4">
          <h1 className="fw-bold text-success mb-2">Swift Mobility</h1>
          <p className="lead text-secondary">Your Urban Mobility Solution</p>
        </div>

        {/* Hero Image */}
        <div className="position-relative rounded-4 overflow-hidden shadow mb-4" style={{ height: "16rem" }}>
          <img
            src={scooterImg}
            alt="E-Scooter"
            className="w-100 h-100 object-fit-cover"
            style={{ objectPosition: "top" }}
          />
          <div
            className="position-absolute bottom-0 start-0 w-100"
            style={{
              background: "linear-gradient(to top, rgba(22,79,50,0.5) 70%, transparent 100%)",
              padding: "1rem",
            }}
          >
            <h2 className="text-white fw-bold mb-1">Explore the City</h2>
            <p className="text-white mb-0">Fast, convenient, and eco-friendly</p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="d-flex flex-column align-items-center gap-3 mb-4">
          <Link to="/signin" className="btn btn-success w-100 fw-medium py-2">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-outline-success w-100 fw-medium py-2">
            Sign Up
          </Link>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h2 className="fs-5 fw-bold text-success mb-3 text-center">Why Choose Swift Mobility</h2>
          <div className="row g-3">
            <div className="col-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: "3rem", height: "3rem" }}>
                    <i className="fa-solid fa-leaf text-success fs-4"></i>
                  </div>
                  <h3 className="fs-6 fw-semibold text-success">Eco-Friendly</h3>
                  <p className="small text-secondary mb-0">
                    Zero emissions transportation that helps reduce your carbon footprint and keeps our cities clean.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: "3rem", height: "3rem" }}>
                    <i className="fa-solid fa-map-marker-alt text-success fs-4"></i>
                  </div>
                  <h3 className="fs-6 fw-semibold text-success">GPS Tracking</h3>
                  <p className="small text-secondary mb-0">
                    Find available scooters nearby and track your ride in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: "3rem", height: "3rem" }}>
                    <i className="fa-solid fa-mobile-screen-button text-success fs-4"></i>
                  </div>
                  <h3 className="fs-6 fw-semibold text-success">Smart Technology</h3>
                  <p className="small text-secondary mb-0">
                    Connect to our app to track your rides, monitor battery life, and access available scooters nearby.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: "3rem", height: "3rem" }}>
                    <i className="fa-solid fa-bolt text-success fs-4"></i>
                  </div>
                  <h3 className="fs-6 fw-semibold text-success">Powerful Performance</h3>
                  <p className="small text-secondary mb-0">
                    Long-lasting battery life and impressive speed capabilities to get you where you need to go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className={`rounded-4 shadow-sm p-3 mb-4 ${howItWorksBg}`}>
          <h2 className={`fs-5 fw-bold mb-3 text-center ${howItWorksTitle}`}>How It Works</h2>
          <div className="row g-3">
            <div className="col-12 d-flex align-items-center">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "2rem", height: "2rem", fontWeight: 600 }}>
                1
              </div>
              <div>
                <h3 className="fs-6 fw-semibold mb-1 text-success">Download the App</h3>
                <p className="mb-0 small text-secondary">Available on iOS and Android</p>
              </div>
            </div>
            <div className="col-12 d-flex align-items-center">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "2rem", height: "2rem", fontWeight: 600 }}>
                2
              </div>
              <div>
                <h3 className="fs-6 fw-semibold mb-1 text-success">Locate a Scooter</h3>
                <p className="mb-0 small text-secondary">Find available scooters on the map</p>
              </div>
            </div>
            <div className="col-12 d-flex align-items-center">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "2rem", height: "2rem", fontWeight: 600 }}>
                3
              </div>
              <div>
                <h3 className="fs-6 fw-semibold mb-1 text-success">Scan & Unlock</h3>
                <p className="mb-0 small text-secondary">Use the QR code to start your ride</p>
              </div>
            </div>
            <div className="col-12 d-flex align-items-center">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "2rem", height: "2rem", fontWeight: 600 }}>
                4
              </div>
              <div>
                <h3 className="fs-6 fw-semibold mb-1 text-success">Enjoy & Park</h3>
                <p className="mb-0 small text-secondary">End your ride in designated areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLanding;