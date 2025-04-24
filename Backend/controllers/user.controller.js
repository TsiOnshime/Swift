// user.controller.js
const { registerUser, verifyEmail } = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blackListToken.model");

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Send fullname as-is
    const result = await registerUser({
      fullname,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;
    const result = await verifyEmail(token, email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Please verify your email first." });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) await blackListTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};
