const express  = require("express");
const router  = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, createProductReview, getAllProductsAdmin} = require("../controller/productController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
 
const validateRequest = require("../utils/validateRequest");
const {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
  reviewSchema,
  deleteReviewSchema,
  deleteProductSchema,
} = require("../validators/productValidator");

router.route("/product").get(getAllProducts)

router.route("/admin/product/new").post(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(createProductSchema, "body"),
  createProduct
);

router.route("/admin/products").get(isAuthentictedUser , authorizeRoles("admin") , getAllProductsAdmin)

router.route("/admin/product/:id").put(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(updateProductSchema, "body"),
  updateProduct
)

router.route("/admin/product/:id").delete(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(deleteProductSchema, "params"),
  deleteProduct
);

router.route("/product/:id").get(
  validateRequest(idParamSchema, "params"),
  getProductDetails
);

router.route("/review/new").put(
  isAuthentictedUser,
  validateRequest(reviewSchema, "body"),
  createProductReview
);

router.route("/reviews").get(getProductReviews) 

router.route("/product/reviews/delete").delete(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(deleteReviewSchema, "query"),
  deleteReview
);

module.exports = router  