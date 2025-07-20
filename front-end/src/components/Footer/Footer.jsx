import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";


function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Set Bootstrap classes for dark/light mode
  const footerBgClass = isDark ? "bg-dark" : "bg-success";
  const textClass = isDark ? "text-light" : "text-white";
  const linkClass = isDark ? "text-success" : "text-white";
  const hrClass = isDark
    ? "border-success opacity-50"
    : "border-white opacity-75";

  return (
    <footer className={`${footerBgClass} ${textClass} pt-5 pb-3`}>
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-2">Swift Mobility</h5>
            <p className="mb-3">
              Let’s ride into a cleaner, smarter, and more equitable future —
              together.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold mb-2">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#home" className={`${linkClass} text-decoration-none`}>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`${linkClass} text-decoration-none`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`${linkClass} text-decoration-none`}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`${linkClass} text-decoration-none`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold mb-2">Support</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#faq" className={`${linkClass} text-decoration-none`}>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#help-center"
                  className={`${linkClass} text-decoration-none`}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#privacy-policy"
                  className={`${linkClass} text-decoration-none`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms-of-service"
                  className={`${linkClass} text-decoration-none`}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h6 className="fw-semibold mb-2">Contact Us</h6>
            <p className="mb-1">+12 378 3630</p>
            <p className="mb-2">swift@gmail.com</p>
          </div>
          <div className="col-12 text-center mt-4">
            <div className="d-flex justify-content-center gap-3">
              {/* Play Store Button */}
              <a
                href="#play-store"
                className="d-inline-block"
                style={{
                  width: 120,
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isDark
                    ? "0 4px 6px rgba(0, 0, 0, 0.5)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <img
                  src="https://i.postimg.cc/XvGB2R6d/vecteezy-badge-google-play-and-app-store-button-download-24170871.png"
                  alt="Play Store"
                  className="img-fluid rounded"
                />
              </a>

              {/* App Store Button */}
              <a
                href="#app-store"
                className="d-inline-block"
                style={{
                  width: 120,
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isDark
                    ? "0 4px 6px rgba(0, 0, 0, 0.5)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <img
                  src="https://i.postimg.cc/fRg0fwpM/vecteezy-badge-google-play-and-app-store-button-download-24170865.png"
                  alt="App Store"
                  className="img-fluid rounded"
                />
              </a>
            </div>
          </div>
        </div>

        <hr className={hrClass + " my-4"} />
        <div className="text-center small" style={{ fontSize: "0.85rem" }}>
          © 2025 Swift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;