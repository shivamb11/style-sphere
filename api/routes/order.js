const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const {
  verifyToken,
  verifyAdmin,
  verifyAuthorization,
} = require("../middlewares");
const { catchAsync } = require("../utilities");

// GET ORDERS
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const orders = await Order.find({});

  res.send(orders);
});

// GET ORDER
router.get(
  "/id",
  verifyToken,
  verifyAuthorization,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findOne({ uid: id });

    res.send(order);
  })
);

// DELETE ORDER
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    await Order.deleteOne({ uid: id });

    res.send("Order deleted successfully");
  })
);

// DELETE ORDERS
router.delete("/", async (req, res) => {
  await Order.deleteMany({});

  res.send("Orders deleted successfully");
});

module.exports = router;
