import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
  }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  walletAddress: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateProfileSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
  }),
  email: Joi.string().email(),
  profileImage: Joi.string().uri(),
});