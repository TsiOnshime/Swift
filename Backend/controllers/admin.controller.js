import adminModel from "../models/admin.model.js";
import * as adminService from "../services/admin.service.js";
import { validationResult } from "express-validator";
import blackListTokenModel from "../models/blacklistToken.model.js";

export const registerAdmin = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const getAdminProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

export const logoutAdmin = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

export const createScooter = async (req, res, next) => {
  try {
    const scooter = await adminService.createScooter(req.body);
    res.status(201).json(scooter);
  } catch (err) {
    next(err);
  }
};

export const updateScooter = async (req, res, next) => {
  try {
    const scooter = await adminService.updateScooter(req.params.id, req.body);
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

export const deleteScooter = async (req, res, next) => {
  try {
    const result = await adminService.deleteScooter(req.params.id);
    if (!result) return res.status(404).json({ message: "Scooter not found" });
    res.json({ message: "Scooter deleted" });
  } catch (err) {
    next(err);
  }
};

export const updateBatteryLevel = async (req, res, next) => {
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
