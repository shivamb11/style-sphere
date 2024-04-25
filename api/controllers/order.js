const Order = require("../models/Order");

module.exports.getOrders = async (req, res) => {
  const orders = await Order.find({});

  res.send(orders);
};

module.exports.getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ uid: id });

  res.send(order);
};

module.exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  await Order.deleteOne({ uid: id });

  res.send("Order deleted successfully");
};

module.exports = async (req, res) => {
  await Order.deleteMany({});

  res.send("Orders deleted successfully");
};
