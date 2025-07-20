import * as scooterService from "../services/scooter.service.js";
import Scooter from "../models/scooter.model.js";
import axios from "axios";

export const getAvailableScooters = async (req, res, next) => {
  try {
    const { lng, lat, maxDistance } = req.query;
    const scooters = await scooterService.findAvailableScooters(
      lng,
      lat,
      maxDistance
    );
    res.json(scooters);
  } catch (err) {
    next(err);
  }
};

export const getScooterById = async (req, res, next) => {
  try {
    const scooter = await scooterService.getScooterById(req.params.id);
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

export const getScooterByQrCode = async (req, res, next) => {
  try {
    const { qrCode } = req.params;
    const scooter = await Scooter.findOne({ qrCode });
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    if (!scooter.isAvailable)
      return res.status(400).json({ message: "Scooter not available" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

// Example controller for fetchQrCode
export const fetchQrCode = async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    const html = response.data;
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
    if (!match) {
      console.error("Could not find __NEXT_DATA__ script tag in HTML");
      return res.status(500).json({ error: "QR code data not found" });
    }
    const nextData = JSON.parse(match[1]);
    const qrText = nextData?.props?.pageProps?.qrCode?.content?.text;
    if (!qrText) {
      console.error("QR code text not found in parsed JSON");
      return res.status(500).json({ error: "QR code text not found" });
    }
    res.send(qrText);
  } catch (err) {
    console.error("fetch-qr error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const scooter = await Scooter.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

export const returnScooter = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { qrCode } = req.params;
    const { lng, lat } = req.body;
    const result = await scooterService.returnScooter(qrCode, userId, lng, lat);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
