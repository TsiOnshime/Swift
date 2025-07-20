// Description: This file contains the service functions for managing scooters.
import Scooter from '../models/scooter.model.js'

export const findAvailableScooters = async (lng, lat, maxDistance) => {
  if (lng && lat && maxDistance) {
    return Scooter.findAvailableScooters(
      [parseFloat(lng), parseFloat(lat)],
      parseInt(maxDistance)
    );
  }
  return Scooter.find({ isAvailable: true });
};

export const getScooterById = async (id) => {
  return Scooter.findById(id);
};

export const rentScooter = async (qrCode, userId) => {
  const scooter = await Scooter.findOne({ qrCode, isAvailable: true });
  if (!scooter) throw new Error("Scooter not available");
  await scooter.markAsRented();
  return scooter;
};

export const returnScooter = async (qrCode, userId, lng, lat) => {
  const scooter = await Scooter.findOne({ qrCode, isAvailable: false });
  if (!scooter) throw new Error("Scooter not found or not rented");
  const newLocation =
    lng && lat
      ? { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] }
      : scooter.location;
  await scooter.markAsReturned(newLocation);
  return scooter;
};
