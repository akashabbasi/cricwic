const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)")),
  avatar: Joi.string().required()
});

// LOGIN USER
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// FORGOT PASSWORD
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// RESET PASSWORD
const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

// UPDATE PASSWORD
const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
});

// UPDATE PROFILE
const updateProfileSchema = Joi.object({
  name: Joi.string().min(4).max(20).optional(),
  email: Joi.string().email().optional(),
  avatar: Joi.string().allow("").optional(),
});

// ADMIN ROLE UPDATE
const updateUserRoleSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin").required(),
});

// ID PARAM VALIDATION (optional but recommended)
const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  updateProfileSchema,
  updateUserRoleSchema,
  idParamSchema,
};