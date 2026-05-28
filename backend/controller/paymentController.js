const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../utils/errorHandler");
const stripe = require("../utils/stripe");

// process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  const { amount } = req.body;
  // extra safety validation
  if (!Number.isInteger(amount) || amount <= 0) {
    return next(new ErrorHandler("Invalid payment amount", 400));
  }

  try {
    const myPayment = await stripe.paymentIntents.create({
      amount,
      currency: "pkr",
      metadata: {
        company: "CricWic",
        userId: req.user?.id || 'unknown',
        timestamp: new Date().toISOString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment Intent Created:', myPayment.id);
    res.status(200).json({ 
      success: true, 
      client_secret: myPayment.client_secret 
    });
  } catch (error) {
    console.error('Stripe Payment Error:', error.message);
    return next(new ErrorHandler("Payment processing failed", 500));
  }
});

// send STRIPE_API_KEY to user =>
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  if (!process.env.STRIPE_API_KEY) {
    return next(new ErrorHandler("Stripe API key not configured", 500));
  }
  
  res.status(200).json({ 
    stripeApiKey: process.env.STRIPE_API_KEY 
  });
});
