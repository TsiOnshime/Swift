import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Scanner.css";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const containerId = "reader";

  useEffect(() => {
    let isMounted = true;

    // Cleanup function to clear scanner and DOM
    const cleanupScanner = async () => {
      if (scannerRef.current) {
        try {
          await scannerRef.current.clear();
        } catch (e) {}
        scannerRef.current = null;
      }
      const readerElem = document.getElementById(containerId);
      if (readerElem) readerElem.innerHTML = "";
      const scanRegion = document.getElementById("reader__scan_region");
      if (scanRegion) scanRegion.innerHTML = "";
    };

    // Run cleanup before creating a new scanner
    cleanupScanner().then(() => {
      if (!isMounted) return;

      const token = localStorage.getItem("token");
      let config = {
        fps: 5,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      };

      const success = async (result) => {
        setScanResult(result);
        try {
          const qrTextRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/scooters/fetch-qr?url=${encodeURIComponent(result)}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          const qrText = qrTextRes.data;
          await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/scooters/qr/${qrText}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          toast.success("Scooter is available and ready!", { theme: "colored" });
          localStorage.setItem("scannedQrCode", qrText);
          setTimeout(() => {
            navigate("/package-selection");
          }, 1500);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            toast.error("Scooter not found.", { theme: "colored" });
          } else if (err.response && err.response.status === 400) {
            toast.error("Scooter is not available.", { theme: "colored" });
          } else {
            toast.error("Error checking scooter.", { theme: "colored" });
          }
        }
      };

      function error(err) {
        console.warn(err);
      }

      // Only create scanner if container exists
      if (document.getElementById(containerId)) {
        scannerRef.current = new Html5QrcodeScanner(containerId, config);
        scannerRef.current.render(success, error);
      }

      // Hide the "Scan an Image File" link after rendering
      setTimeout(() => {
        const scanImageLink = document.querySelector(
          "#reader__dashboard_section_csr > span > a"
        );
        if (scanImageLink) {
          scanImageLink.style.display = "none";
        }
      }, 500);
    });

    return () => {
      isMounted = false;
      cleanupScanner();
    };
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h1
                className="card-title text-center text-success mb-4 fw-bold"
                style={{ fontSize: "2rem" }}
              >
                Scan QR Code
              </h1>
              <p className="text-center text-secondary mb-4">
                Point your camera at the scooter's QR code to unlock and start
                your ride.
              </p>
              <div className="d-flex justify-content-center">
                <div
                  id={containerId}
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    minHeight: 250,
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(44, 62, 80, 0.1)",
                    background: "#fff",
                    padding: "1rem",
                  }}
                  className="mx-auto"
                ></div>
              </div>
              {scanResult && (
                <div className="alert alert-success mt-4 text-center fw-semibold">
                  Scan successful! Redirecting...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Scanner;