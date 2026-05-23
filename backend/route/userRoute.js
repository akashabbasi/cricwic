const express = require("express");

const router = express.Router();

const validateRequest = require("../utils/validateRequest");
const { 
    signupSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updatePasswordSchema,
    updateProfileSchema,
    updateUserRoleSchema,
    idParamSchema,
} = require("../validators/userValidator");
    
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateProfile, 
    getAllUser, 
    getSingleUser, 
    deleteUser, 
    updateUserRole,  
} = require("../controller/userConttroler");

const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

router.route("/register").post(
    validateRequest(signupSchema, "body"), 
    registerUser,
);

router.route("/login").post(
  validateRequest(loginSchema, "body"),
  loginUser
);

router.route("/logout").get(logoutUser);

router.route("/password/reset/:token").put(
  validateRequest(resetPasswordSchema, "body"),
  resetPassword
);

router.route("/profile").get(isAuthentictedUser , getUserDetails);

router.route("/password/forgot").post(
  validateRequest(forgotPasswordSchema, "body"),
  forgotPassword
);

router.route("/password/update").put(
  isAuthentictedUser,
  validateRequest(updatePasswordSchema, "body"),
  updatePassword
);

router.route("/profile/update").put(
  isAuthentictedUser,
  validateRequest(updateProfileSchema, "body"),
  updateProfile
);

router.route("/admin/users").get(isAuthentictedUser , authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id")
    .get(
        isAuthentictedUser , 
        authorizeRoles("admin"),
        validateRequest(idParamSchema, "params"), 
        getSingleUser,
    ).put(
        isAuthentictedUser , 
        authorizeRoles("admin"),
        validateRequest(updateUserRoleSchema, "body"), 
        updateUserRole,
    ).delete(
        isAuthentictedUser , 
        authorizeRoles("admin"), 
        validateRequest(idParamSchema, "params"),
        deleteUser,
    )

module.exports = router;