// const { Chapa } = require("chapa-nodejs");
// const Payment = require("../models/payment.model");
// const chapa = new Chapa({ secretKey: process.env.CHAPA_SECRET_KEY });

// module.exports.initPayment = async ({ user, rental, amount, email, first_name, last_name }) => {
//   const tx_ref = await chapa.genTxRef();

//   // Save payment record as pending
//   await Payment.create({ user, rental, tx_ref, amount, status: "pending" });

//   const response = await chapa.initialize({
//     first_name,
//     last_name,
//     email,
//     currency: "ETB",
//     amount: String(amount),
//     tx_ref,
//     callback_url: process.env.CHAPA_CALLBACK_URL,
//     return_url: process.env.CHAPA_RETURN_URL,
//     customization: {
//       title: "E-Scooter Rental Payment",
//       description: "Payment for your scooter rental"
//     }
//   });

//   return { checkout_url: response.data.checkout_url, tx_ref };
// };

// module.exports.verifyPayment = async (tx_ref) => {
//   const response = await chapa.verify({ tx_ref });
//   if (response.data.status === "success") {
//     await Payment.findOneAndUpdate({ tx_ref }, { status: "success" });
//     return true;
//   } else {
//     await Payment.findOneAndUpdate({ tx_ref }, { status: "failed" });
//     return false;
//   }
// };