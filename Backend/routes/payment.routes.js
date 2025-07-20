import express from "express";
import {
  createPaymentIntent,
  confirmPayment,
} from "../controllers/payment.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { confirmPaymentSchema } from "../validators/payment.validator.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post(
  "/confirm-payment",
  authUser,
  validateBody(confirmPaymentSchema),
  confirmPayment
);

export default router;
