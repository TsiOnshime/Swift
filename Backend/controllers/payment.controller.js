import stripe from '../utils/stripe.js';
import Scooter from "../models/scooter.model.js";
import User from '../models/user.model.js';
import Rental from '../models/rental.model.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', email } = req.body;
    // amount should be in the smallest currency unit (e.g., cents for USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g., 5000 for $50.00
      currency,
      receipt_email: email,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { tx_ref, amount, time, scooterId } = req.body;
    const scooter = await Scooter.findOne({ qrCode: scooterId });
    if (!scooter) {
      return res.status(404).json({ error: "Scooter not found" });
    }
    if (!scooter.isAvailable) {
      return res.status(400).json({ error: "Scooter not available" });
    }
    scooter.isAvailable = false;
    scooter.rentalTime = time;
    await scooter.save();

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.paymentStatus = "completed";
    user.rentedScooter = scooter._id;
    user.rentalStartTime = new Date();
    await user.save();

    // Parse time to minutes (handle both string and number)
    let durationMinutes = 0;
    if (typeof time === "string") {
      if (time.includes("hour")) {
        durationMinutes = parseInt(time) * 60;
      } else if (time.includes("minute")) {
        durationMinutes = parseInt(time);
      } else {
        durationMinutes = parseInt(time);
      }
    } else {
      durationMinutes = Number(time);
    }
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      return res.status(400).json({ error: "Invalid rental time." });
    }

    // Parse amount to number
    const numericAmount = typeof amount === "string"
      ? parseInt(amount.replace(/\D/g, ""), 10)
      : amount;

    // Store rental details in Rental model
    await Rental.create({
      user: user._id,
      scooter: scooter._id,
      cost: numericAmount,
      tx_ref,
      startTime: new Date(),
      endTime: new Date(Date.now() + durationMinutes * 60 * 1000),
      duration: durationMinutes,
      walletAddress: user.walletAddress, // <-- Add this line
    });

    res.status(200).json({ message: "Payment confirmed and scooter booked!" });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  }
};