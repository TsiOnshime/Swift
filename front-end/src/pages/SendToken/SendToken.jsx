import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendTokens } from "../../utils/sendTokens";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const TOKEN_MINT = import.meta.env.VITE_MINT_ADDRESS;
const TOKEN_DECIMALS = 9;

const SendToken = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";

  const { publicKey, sendTransaction, connected } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!connected) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (!recipient || !amount) {
      toast.error("Please enter both wallet address and amount.");
      return;
    }
    setLoading(true);
    try {
      const smallestAmount =
        parseInt(amount, 10) * Math.pow(10, TOKEN_DECIMALS);
      const { tx, connection } = await sendTokens(
        { publicKey, sendTransaction },
        recipient,
        smallestAmount,
        TOKEN_MINT
      );
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");
      toast.success("Tokens sent successfully!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      toast.error(
        "Failed to send tokens. Please check the address and amount."
      );
    }
    setLoading(false);
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${bgClass}`}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className={`card shadow-lg border-0 rounded-4 ${cardBg}`}>
              <div className="card-body p-4">
                <h2 className="mb-4 fw-bold text-success text-center" style={{ fontSize: "2rem" }}>
                  Send Tokens to a Friend
                </h2>
                <form onSubmit={handleSend} autoComplete="off">
                  <div className="mb-3 text-start">
                    <label htmlFor="recipient" className="form-label fw-semibold text-success">
                      Friend's Wallet Address
                    </label>
                    <input
                      id="recipient"
                      type="text"
                      className="form-control"
                      placeholder="Enter wallet address"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="amount" className="form-label fw-semibold text-success">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-success w-100 py-2 fw-bold"
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(90deg, #2ebd7f 60%, #258555 100%)",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Tokens"
                    )}
                  </button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendToken;