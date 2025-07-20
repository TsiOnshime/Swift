// validators/payment.validator.js
import Joi from "joi";
export const confirmPaymentSchema = Joi.object({
  tx_ref: Joi.string().required(),
  amount: Joi.number().positive().required(),
  time: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  scooterId: Joi.string().required(),
});
