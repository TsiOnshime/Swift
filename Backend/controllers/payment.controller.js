const paymentService = require("../services/payment.service");
const Rental = require("../models/rental.model");
const User = require("../models/user.model");

module.exports.initiatePayment = async (req, res, next) => {
  try {
    const { rentalId } = req.body;
    const rental = await Rental.findById(rentalId).populate("user");
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    const { checkout_url, tx_ref } = await paymentService.initPayment({
      user: rental.user._id,
      rental: rental._id,
      amount: rental.cost,
      email: rental.user.email,
      first_name: rental.user.fullname.firstname,
      last_name: rental.user.fullname.lastname
    });

    // Optionally save tx_ref to rental for later verification
    rental.tx_ref = tx_ref;
    await rental.save();

    res.json({ checkout_url });
  } catch (err) {
    next(err);
  }
};

module.exports.paymentCallback = async (req, res, next) => {
  try {
    const { tx_ref } = req.query;
    const success = await paymentService.verifyPayment(tx_ref);
    // Update rental/payment status as needed
    if (success) {
      // Optionally update rental status
      return res.redirect(process.env.CHAPA_RETURN_URL + "?status=success");
    } else {
      return res.redirect(process.env.CHAPA_RETURN_URL + "?status=failed");
    }
  } catch (err) {
    next(err);
  }
};