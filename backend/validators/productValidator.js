const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().required().min(200),
  stock: Joi.number().required().min(1),
  category: Joi.string().required(),
  images: Joi.alternatives()
    .try(
      Joi.string(),           // single base64/url
      Joi.array().items(Joi.string()) // multiple images
    )
    .required(),
  user: Joi.string().optional(), // injected from auth middleware
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().min(200).optional(),
  stock: Joi.number().min(1).optional(),
  category: Joi.string().optional(),
  images: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.array().items(Joi.string())
    )
    .optional(),
});

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const reviewSchema = Joi.object({
  ratings: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
  productId: Joi.string().hex().length(24).required(),
  title: Joi.string().max(100).required(),
  recommend: Joi.string().valid('yes', 'no').required(),
});

const deleteReviewSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  id: Joi.string().hex().length(24).required(),
});

const deleteProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
  reviewSchema,
  deleteReviewSchema,
  deleteProductSchema,
};