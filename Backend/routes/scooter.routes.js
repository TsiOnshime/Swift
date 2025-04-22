const express = require("express");
const router = express.Router();
const scooterController = require("../controllers/scooter.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// List all available scooters (optionally near a location)
router.get("/", scooterController.getAvailableScooters);

// Get details of a specific scooter
router.get("/:id", scooterController.getScooterById);

// Start rental by scanning QR code (protected)
router.post("/:qrCode/rent", authMiddleware.authUser, scooterController.rentScooter);

// Return scooter (protected)
router.post("/:qrCode/return", authMiddleware.authUser, scooterController.returnScooter);



module.exports = router;