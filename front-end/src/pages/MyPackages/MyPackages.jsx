import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { useWallet } from "@solana/wallet-adapter-react";
import "bootstrap/dist/css/bootstrap.min.css";

const getRemainingTime = (endTime) => {
  if (!endTime) return { text: "N/A", ms: null };
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return { text: "Expired", ms: 0 };
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { text: `${mins} min ${secs} sec`, ms: diff };
};

const MyPackages = () => {
  const { publicKey } = useWallet();
  const [packages, setPackages] = useState([]);
  const [rewardedPackages, setRewardedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/my-packages`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPackages(res.data);
      } catch {
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Timer for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toast warnings for 75% and 100% usage
  useEffect(() => {
    packages.forEach((pkg) => {
      if (!pkg.startTime || !pkg.endTime) return;

      const start = new Date(pkg.startTime).getTime();
      const end = new Date(pkg.endTime).getTime();
      const now = Date.now();
      const total = end - start;
      const used = now - start;
      const percent = total > 0 ? used / total : 0;

      // 75% warning
      if (
        percent >= 0.75 &&
        percent < 1 &&
        !pkg._toast75 // prevent duplicate toasts
      ) {
        toast.warn(`Warning: You have used 75% of your package duration.`, {
          toastId: `warn-75-${pkg._id}`,
        });
        pkg._toast75 = true;
      }

      // 100% warning
      if (percent >= 1 && !pkg._toast100) {
        toast.error(`You have used all your package duration.`, {
          toastId: `warn-100-${pkg._id}`,
        });
        pkg._toast100 = true;
      }
    });
    // eslint-disable-next-line
  }, [tick, packages]);

  useEffect(() => {
    if (!publicKey) {
      console.log("Wallet not connected, skipping reward call.");
      return;
    }

    packages.forEach((pkg) => {
      if (!pkg.startTime || !pkg.endTime) return;

      const start = new Date(pkg.startTime).getTime();
      const end = new Date(pkg.endTime).getTime();
      const now = Date.now();
      const total = end - start;
      const used = now - start;
      const percent = total > 0 ? used / total : 0;

      if (percent >= 1 && !rewardedPackages.includes(pkg._id)) {
        // Mark scooter as available
        if (pkg.scooter && pkg.scooter._id) {
          axios.patch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/scooters/${
              pkg.scooter._id
            }/available`,
            { isAvailable: true },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }
        // === Trigger reward here ===
        console.log("Rewardedddddd user:", publicKey.toString());
        axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/reward`, {
          walletAddress: publicKey.toString(),
          amount: 2 * 10 ** 9,
        });
        setRewardedPackages((prev) => [...prev, pkg._id]);
      }
    });
    // eslint-disable-next-line
  }, [tick, packages, publicKey, rewardedPackages]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/my-packages/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted.");
    } catch {
      toast.error("Failed to delete package.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="bg-white rounded-4 shadow p-4">
              <h2
                className="fw-bold text-success text-center mb-4"
                style={{ letterSpacing: 1 }}
              >
                <i className="bi bi-box-seam me-2"></i>My Packages
              </h2>
              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>
                </div>
              ) : packages.length === 0 ? (
                <div className="alert alert-info text-center mb-0">
                  No active packages found.
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {packages.map((pkg) => {
                    const { text } = getRemainingTime(pkg.endTime);
                    const isExpired = text === "Expired";
                    return (
                      <div
                        className={`list-group-item bg-light rounded-3 mb-3 shadow-sm border-0 position-relative ${
                          isExpired ? "opacity-75" : ""
                        }`}
                        key={pkg._id}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span
                            className={`badge px-3 py-2 fs-6 ${
                              isExpired
                                ? "bg-danger"
                                : "bg-success bg-opacity-75"
                            }`}
                          >
                            {isExpired ? "Expired" : "Active"}
                          </span>
                          {isExpired && (
                            <button
                              className="btn btn-outline-danger btn-sm d-flex align-items-center"
                              title="Delete package"
                              onClick={() => handleDelete(pkg._id)}
                            >
                              <FaTrash className="me-1" /> Delete
                            </button>
                          )}
                        </div>
                        <div className="row g-2">
                          <div className="col-12 col-md-6">
                            <span className="fw-semibold text-success">
                              Start Time:
                            </span>{" "}
                            <span>
                              {new Date(pkg.startTime).toLocaleString()}
                            </span>
                          </div>
                          <div className="col-12 col-md-6">
                            <span className="fw-semibold text-success">
                              End Time:
                            </span>{" "}
                            <span>
                              {pkg.endTime
                                ? new Date(pkg.endTime).toLocaleString()
                                : "N/A"}
                            </span>
                          </div>
                          <div className="col-12 mt-2">
                            <span className="fw-semibold text-success">
                              Remaining:
                            </span>{" "}
                            <span
                              className={`fw-bold ${
                                isExpired ? "text-danger" : "text-primary"
                              }`}
                            >
                              {pkg.endTime ? text : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPackages;