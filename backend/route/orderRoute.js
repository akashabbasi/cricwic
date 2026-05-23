const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

const validateRequest = require("../utils/validateRequest");

const {
  createOrderSchema,
  orderIdSchema,
  updateOrderSchema,
} = require("../validators/orderValidator");
 
router.route("/order/new").post(
  isAuthentictedUser,
  validateRequest(createOrderSchema, "body"),
  newOrder
);

router.route("/order/:id").get(
  isAuthentictedUser,
  validateRequest(orderIdSchema, "params"),
  getSingleOrder
);

router.route("/orders/myOrders").get(isAuthentictedUser , myOrders)

router.route("/admin/orders").get(isAuthentictedUser , authorizeRoles("admin") ,getAllOrders);

router.route("/admin/order/:id").put(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(orderIdSchema, "params"),
  validateRequest(updateOrderSchema, "body"),
  updateOrder
);

router.route("/admin/order/:id").delete(
  isAuthentictedUser,
  authorizeRoles("admin"),
  validateRequest(orderIdSchema, "params"),
  deleteOrder
);

module.exports = router;
