const express = require("express");
const router = express.Router();

const { verifyToken, verifyAdmin } = require("../middlewares");
const { catchAsync } = require("../utilities");
const product = require("../controllers/product");

// GET PRODUCT
router.get("/:id", catchAsync(product.getProduct));

// DELETE PRODUCT
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  catchAsync(product.deleteProduct)
);

// ADD PRODUCT
router.post("/", verifyToken, verifyAdmin, catchAsync(product.addProduct));

module.exports = router;
