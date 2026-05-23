const Joi = require("joi");

/**
 * Generic request validator middleware
 * @param {Object} schema - Joi schema object
 * @param {"body"|"query"|"params"} source - request source to validate
 */
const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    const data = req[source];

    const { error } = schema.validate(data, {
      abortEarly: false, // return all errors
      allowUnknown: false, // reject extra fields
      stripUnknown: true, // remove unknown fields
    });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errorMessages[0],
        errors: errorMessages,
      });
    }

    // replace request with cleaned data
    req[source] = data;

    next();
  };
};

module.exports = validateRequest;