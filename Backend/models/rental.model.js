import mongoose from 'mongoose'

const rentalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  scooter: { type: mongoose.Schema.Types.ObjectId, ref: "Scooter", required: true },
  cost: { type: Number, required: true },
  tx_ref: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  rewarded: { type: Boolean, default: false },
  walletAddress: { type: String } // Add this line to store the user's wallet address
});

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental