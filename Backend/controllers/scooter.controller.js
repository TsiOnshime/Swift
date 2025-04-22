const scooterService = require("../services/scooter.service");

module.exports.getAvailableScooters = async (req, res, next) => {
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

module.exports.getScooterById = async (req, res, next) => {
  try {
    const scooter = await scooterService.getScooterById(req.params.id);
    if (!scooter) return res.status(404).json({ message: "Scooter not found" });
    res.json(scooter);
  } catch (err) {
    next(err);
  }
};

module.exports.rentScooter = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { qrCode } = req.params;
    const rental = await scooterService.rentScooter(qrCode, userId);
    res.json(rental);
  } catch (err) {
    next(err);
  }
};

module.exports.returnScooter = async (req, res, next) => {
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
