import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectToDb from "./db/db.js";
// import xss from "xss-clean";
import userRoutes from "./routes/user.routes.js";
import scooterRoutes from "./routes/scooter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import rewardRoutes from "./routes/reward.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sanitizeRequest } from "./middlewares/sanitize.middleware.js";


dotenv.config();

const app = express();

connectToDb();

// General limiter (for all routes)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(generalLimiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sanitizeRequest);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/scooters", scooterRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payments", paymentRoutes);
// app.use("/api/v1/rewards", rewardRoutes);

// Centralized error handler (last middleware)


console.log("Backend started at", new Date().toISOString());

export default app;
