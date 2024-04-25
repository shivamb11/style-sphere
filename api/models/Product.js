const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    special: {
      type: String,
      default: "",
    },
    images: {
      type: [imageSchema],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 100,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
