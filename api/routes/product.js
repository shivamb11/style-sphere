const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const { verifyToken, verifyAdmin } = require("../middlewares");
const { catchAsync } = require("../utilities");

// GET PRODUCT
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.send(product);
  })
);

// ADD PRODUCT
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  catchAsync(async (req, res) => {
    const {
      title,
      description,
      size,
      price,
      isnew,
      images,
      discount,
      instock,
      category,
      subcategory,
      type,
    } = req.body;

    const product = new Product({
      title,
      description,
      size,
      price,
      isnew,
      images,
      discount,
      instock,
      category,
      subcategory,
      type,
    });

    await product.save();

    res.send(product);
  })
);

// DELETE PRODUCT
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    res.send(product);
  })
);

module.exports = router;
