const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");
const router  = express.Router();

const validateRequest = require("../utils/validateRequest");

const {
  processPaymentSchema,
} = require("../validators/paymentValidator");

router.route("/payment/process").post(
    isAuthentictedUser,
    validateRequest(processPaymentSchema, "body"), 
    processPayment,
);

router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router