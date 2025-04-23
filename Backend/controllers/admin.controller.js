const adminModel = require("../models/admin.model");
const adminService = require("../services/admin.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.registerAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isAdminAlready = await adminModel.findOne({ email });

  if (isAdminAlready) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await adminModel.hashPassword(password);

  const admin = new adminModel({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();

  const token = admin.generateAuthToken();

  res.status(201).json({ token, admin });
};

module.exports.loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = admin.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, admin });
};

module.exports.getAdminProfile = async (req, res, next) => {
  res.status(200).json(req.user);
  
};

module.exports.logoutAdmin = async (req, res, next) => {
  res.clearCookie("token");
  const token =
    req.cookies.token || (req.headers.authorization.split(" ")[1]);

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

module.exports.createScooter = async (req, res, next) => {
  try {
    const scooter = await adminService.createScooter(req.body);
    res.status(201).json(scooter);
  } catch (err) {
    next(err);
  }
};

module.exports.updateScooter = async (req, res, next) => {
  try {
    const scooter = await adminService.updateScooter(req.params.id, req.body);
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteScooter = async (req, res, next) => {
  try {
    const result = await adminService.deleteScooter(req.params.id);
    if (!result) return res.status(404).json({ message: "Scooter not found" });
    res.json({ message: "Scooter deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports.updateBatteryLevel = async (req, res, next) => {
  try {
    const { qrCode } = req.params;
    const { batteryLevel } = req.body;
    const scooter = await adminService.updateBatteryLevel(qrCode, batteryLevel);
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};
