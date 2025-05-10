import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  rentedScooter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "scooter",
  },
  rentalStartTime: {
    type: Date,
  },
  rentalEndTime: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  profileImage: {
    type: String,
    default: "", // or set a default avatar path if you want
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  walletAddress: {
    type: String,
    required: true, // or false if optional
    unique: true,   // if you want each wallet only once
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});
userSchema.methods.startRental = function (scooterId) {
  this.rentedScooter = scooterId;
  this.rentalStartTime = new Date();
  this.paymentStatus = "pending";
};

userSchema.methods.endRental = function () {
  this.rentalEndTime = new Date();
  this.rentedScooter = null;
  this.paymentStatus = "completed";
};

userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
