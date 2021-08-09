const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/order`, requireSignin,adminMiddleware, updateOrder);
router.post(
  `/order/getOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;