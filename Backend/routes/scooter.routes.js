import express from "express";
import * as scooterController from "../controllers/scooter.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

import {
  createScooterSchema,
  updateAvailabilitySchema,
} from "../validators/scooter.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";

import * as adminController from "../controllers/admin.controller.js";
const router = express.Router();

// Fetch QR code (protected)
router.get("/fetch-qr", authMiddleware.authUser, scooterController.fetchQrCode);
// List all available scooters (optionally near a location)
router.get("/", scooterController.getAvailableScooters);
// Get details of a specific scooter by QR code
router.get("/qr/:qrCode", scooterController.getScooterByQrCode);

// Get details of a specific scooter
router.get("/:id", scooterController.getScooterById);

// Update scooter availability (protected)
router.patch(
  "/:id/available",
  authMiddleware.authUser,
  validateBody(updateAvailabilitySchema),
  scooterController.updateAvailability
);

// Create scooter (admin)
router.post(
  "/",
  authMiddleware.authUser,
  authMiddleware.authAdmin,
  validateBody(createScooterSchema),
  adminController.createScooter
);

// Return scooter (protected)
router.post(
  "/:qrCode/return",
  authMiddleware.authUser,
  scooterController.returnScooter
);

export default router;
