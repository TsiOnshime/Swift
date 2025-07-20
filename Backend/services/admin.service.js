import Scooter from "../models/scooter.model.js";
import Admin from "../models/admin.model.js";
import { nanoid } from "nanoid";

export const registerAdmin = async (data) => {
  const admin = new Admin(data);
  return admin.save();
};

export const createScooter = async (data) => {
  data.qrCode = nanoid()
  const scooter = new Scooter(data);
  return scooter.save();
};

export const updateScooter = async (id, data) => {
  return Scooter.findByIdAndUpdate(id, data, { new: true });
};

export const deleteScooter = async (id) => {
  return Scooter.findByIdAndDelete(id);
};

export const updateBatteryLevel = async (qrCode, batteryLevel) => {
  return Scooter.updateBatteryLevel(qrCode, batteryLevel);
};
