import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaCoins } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Redeem = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const [activeTab, setActiveTab] = useState("money");
  const [tokensToRedeem, setTokensToRedeem] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const userTokens = 0;
  const conversionRate = 0.05; // $0.05 per token

  const packages = [
    {
      id: "basic",
      name: "Basic",
      tokens: 500,
      duration: "1 Week",
      benefits: "Unlimited 30-min rides",
    },
    {
      id: "standard",
      name: "Standard",
      tokens: 1000,
      duration: "2 Weeks",
      benefits: "Unlimited 45-min rides",
    },
    {
      id: "premium",
      name: "Premium",
      tokens: 2000,
      duration: "1 Month",
      benefits: "Unlimited rides + Premium scooters",
    },
    {
      id: "family",
      name: "Family",
      tokens: 3000,
      duration: "1 Month",
      benefits: "Up to 4 users, Unlimited rides",
    },
  ];

  const handleTokenInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= userTokens) {
      setTokensToRedeem(value);
    }
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  const handleRedeem = () => {
    // Implement redeem logic here
    // Show confirmation, etc.
  };

  // Make the page scrollable by setting overflow and height on a wrapper
  const pageBg = isDark
    ? { background: "linear-gradient(135deg, #23272b 70%, #181a1b 100%)", minHeight: "100vh" }
    : { background: "linear-gradient(120deg, #e8f9f1 60%, #f6fff9 100%)", minHeight: "100vh" };

  return (
    <div style={{ ...pageBg, height: "100vh", overflowY: "auto" }} className="py-5">
      <div className="container">
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-4" style={{ color: "#164f32" }}>
            Token Redemption
          </h1>
          <div className={`d-inline-flex align-items-center rounded-4 shadow-sm px-4 py-3 mb-2 ${isDark ? "bg-secondary" : "bg-white"}`}>
            <span className="bg-success d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: 54, height: 54 }}>
              <FaCoins size={28} color="#fff" />
            </span>
            <div>
              <div className="text-muted small">Current Balance</div>
              <div className="fw-bold fs-3" style={{ color: "#164f32" }}>
                {userTokens} <span className="fs-6 text-secondary">Tokens</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <ul className="nav nav-tabs justify-content-center mb-4 border-0">
          <li className="nav-item">
            <button
              className={`nav-link fw-semibold ${activeTab === "money" ? "active text-success border-success border-bottom border-3" : isDark ? "text-light" : "text-secondary"}`}
              style={{ fontSize: "1.1rem" }}
              onClick={() => setActiveTab("money")}
            >
              Convert to Money
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-semibold ${activeTab === "package" ? "active text-success border-success border-bottom border-3" : isDark ? "text-light" : "text-secondary"}`}
              style={{ fontSize: "1.1rem" }}
              onClick={() => setActiveTab("package")}
            >
              Purchase Package
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {activeTab === "money" && (
              <div className={`card shadow-lg border-0 rounded-4 mb-4 ${cardBg}`}>
                <div className="card-body">
                  <h2 className="h4 fw-bold mb-3" style={{ color: "#164f32" }}>
                    Convert Tokens to Money
                  </h2>
                  <p className="text-secondary mb-4">
                    Exchange your tokens for real money at the rate of <span className="fw-bold">${conversionRate.toFixed(2)}</span> per token.
                  </p>
                  <label htmlFor="tokensToRedeem" className="form-label fw-semibold">
                    Tokens to Redeem
                  </label>
                  <input
                    id="tokensToRedeem"
                    type="number"
                    value={tokensToRedeem}
                    onChange={handleTokenInputChange}
                    className="form-control mb-3"
                    placeholder="Enter tokens to redeem"
                    min={0}
                    max={userTokens}
                  />
                  <div className="mb-3">
                    <span className="fw-semibold">You will receive: </span>
                    <span className="text-success fw-bold">
                      ${(tokensToRedeem * conversionRate).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleRedeem}
                    disabled={tokensToRedeem < 100}
                    className="btn btn-success w-100 py-2 fw-bold"
                  >
                    Redeem Now
                  </button>
                  <div className="form-text mt-2 text-secondary">
                    Minimum 100 tokens required to redeem.
                  </div>
                </div>
              </div>
            )}
            {activeTab === "package" && (
              <div className={`card shadow-lg border-0 rounded-4 mb-4 ${cardBg}`}>
                <div className="card-body">
                  <h2 className="h4 fw-bold mb-3" style={{ color: "#164f32" }}>
                    Purchase Packages with Tokens
                  </h2>
                  <div className="row">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="col-12 col-md-6 mb-3"
                      >
                        <div
                          className={`card h-100 border-2 ${selectedPackage === pkg.id ? "border-success shadow" : "border-light"} ${isDark ? "bg-dark text-light" : "bg-light"}`}
                          style={{ cursor: "pointer", borderRadius: "1rem", transition: "box-shadow 0.2s, border-color 0.2s, background 0.2s" }}
                          onClick={() => handlePackageSelect(pkg.id)}
                        >
                          <div className="card-body text-center">
                            <h3 className="h5 fw-bold mb-2" style={{ color: "#164f32" }}>{pkg.name} Package</h3>
                            <div className="mb-1 text-secondary">{pkg.benefits}</div>
                            <div className="fw-bold text-success mb-1">{pkg.tokens} Tokens</div>
                            <div className="small text-muted">{pkg.duration}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleRedeem}
                    disabled={!selectedPackage}
                    className="btn btn-success w-100 py-2 fw-bold mt-2"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redeem;