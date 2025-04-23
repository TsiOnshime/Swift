const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/initiate", authMiddleware.authUser, paymentController.initiatePayment);
router.get("/callback", paymentController.paymentCallback);

module.exports = router;