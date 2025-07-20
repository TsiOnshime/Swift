import Joi from "joi";

export const createScooterSchema = Joi.object({
  qrCode: Joi.string().required(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  batteryLevel: Joi.number().min(0).max(100).required(),
});

export const updateAvailabilitySchema = Joi.object({
  isAvailable: Joi.boolean().required(),
});