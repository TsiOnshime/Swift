import express from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import Rental from "../models/rental.model.js";
import { rewardUserForPackage } from "../controllers/user.controller.js";
import { registerSchema, loginSchema, updateProfileSchema } from "../validators/user.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 attempts per 15 minutes per IP
  message: "Too many login attempts. Please try again later.",
});

const router = express.Router();

// Register
router.post("/register", validateBody(registerSchema), userController.registerUser);


// Login
router.post("/login", validateBody(loginSchema),loginLimiter, userController.loginUser);

// Update Profile
router.put("/edit-profile", authMiddleware.authUser, userController.updateUserProfile);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

router.get("/verify-email", userController.verifyEmail);

router.get("/my-packages", authMiddleware.authUser, async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id })
      .populate("scooter")
      .sort({ startTime: -1 });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

router.delete("/my-packages/:id", authMiddleware.authUser, async (req, res) => {
  try {
    const deleted = await Rental.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ error: "Package not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete package" });
  }
});

router.post("/reward", rewardUserForPackage);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

export default router;
