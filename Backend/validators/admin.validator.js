import Joi from "joi";

export const adminRegisterSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
  }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});