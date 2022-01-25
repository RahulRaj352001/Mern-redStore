const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrdersStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, autherizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, autherizeRoles("admin"), updateOrdersStatus)
  .delete(isAuthenticatedUser, autherizeRoles("admin"), deleteOrder);

module.exports = router;
