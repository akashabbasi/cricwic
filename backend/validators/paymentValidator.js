const Joi = require("joi");

const processPaymentSchema = Joi.object({
  amount: Joi.number()
    .integer()
    .positive()
    .max(999999999)
    .required(),
});

module.exports = {
  processPaymentSchema,
};