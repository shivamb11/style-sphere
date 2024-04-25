const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
  verifyAuthorization,
} = require("../middlewares");
const { catchAsync } = require("../utilities");
const order = require("../controllers/order");

// GET ORDERS
router.get("/", verifyToken, verifyAdmin, catchAsync(order.getOrders));

// DELETE ORDERS
router.delete("/", catchAsync(order.deleteOrder));

// GET ORDER
router.get("/id", verifyToken, verifyAuthorization, catchAsync(order.getOrder));

// DELETE ORDER
router.delete("/:id", verifyToken, verifyAdmin, catchAsync(order.deleteOrder));

module.exports = router;
