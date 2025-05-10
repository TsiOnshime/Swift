import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./index.css";

const wallets = [new PhantomWalletAdapter()];
const endpoint = "https://api.devnet.solana.com";

const stripePromise = loadStripe(
  "pk_test_51RJO7hPGqQb1dTGHZa3GC6b9OXv408znZPM693GDUNRgFmztoR6KLAk8JTRUvy6KD23F9vzSTBW9uiihiojpds1Q000A6m8tHn"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Elements stripe={stripePromise}>
            <UserContext>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </UserContext>
          </Elements>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>
);
