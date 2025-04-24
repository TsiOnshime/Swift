const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const scooterRoutes = require("./routes/scooter.routes");
const adminRoutes = require("./routes/admin.routes");
// const paymentRoutes = require("./routes/payment.routes");
require("dotenv").config(); // Make sure this is at the very top!


connectToDb();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/scooters", scooterRoutes);
app.use("/admin", adminRoutes);
// app.use("/payments", paymentRoutes);

module.exports = app;
