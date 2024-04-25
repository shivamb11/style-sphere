const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    products: {
      type: [],
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
