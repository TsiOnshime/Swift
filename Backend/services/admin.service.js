const Scooter = require('../models/scooter.model');
const Admin = require("../models/admin.model");

module.exports.registerAdmin = async (data) => {
  
  const admin = new Admin(data);
  return admin.save();
}

module.exports.createScooter = async (data) => {
  const scooter = new Scooter(data);
  return scooter.save();
};

module.exports.updateScooter = async (id, data) => {
  return Scooter.findByIdAndUpdate(id, data, { new: true });
};

module.exports.deleteScooter = async (id) => {
  return Scooter.findByIdAndDelete(id);
};

module.exports.updateBatteryLevel = async (qrCode, batteryLevel) => {
  return Scooter.updateBatteryLevel(qrCode, batteryLevel);
};
