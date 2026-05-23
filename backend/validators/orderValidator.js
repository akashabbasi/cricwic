const Joi = require("joi");

const orderItemSchema = Joi.object({
  name: Joi.string().required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),

  image: Joi.string().required(),

  price: Joi.number()
    .min(0)
    .required(),

  productId: Joi.string()
    .hex()
    .length(24)
    .required(),
});

const shippingInfoSchema = Joi.object({
  address: Joi.string().required(),

  city: Joi.string().required(),

  state: Joi.string().required(),

  country: Joi.string().required(),

  pinCode: Joi.string().required(),

  phoneNo: Joi.string().required(),
});

const paymentInfoSchema = Joi.object({
  id: Joi.string().required(),

  status: Joi.string()
    .valid("succeeded", "pending", "failed")
    .required(),
});

const createOrderSchema = Joi.object({
  shippingInfo: shippingInfoSchema.required(),

  orderItems: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required(),

  paymentInfo: paymentInfoSchema.required(),

  itemsPrice: Joi.number()
    .min(0)
    .required(),

  taxPrice: Joi.number()
    .min(0)
    .optional(),

  shippingPrice: Joi.number()
    .min(0)
    .required(),

  totalPrice: Joi.number()
    .min(0)
    .required(),
});

const orderIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required(),
});

const updateOrderSchema = Joi.object({
  status: Joi.string()
    .valid("Processing", "Shipped", "Delivered")
    .required(),
});

module.exports = {
  createOrderSchema,
  orderIdSchema,
  updateOrderSchema,
};