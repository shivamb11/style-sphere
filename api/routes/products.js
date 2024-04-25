const express = require("express");
const router = express.Router();

const { catchAsync } = require("../utilities");
const products = require("../controllers/products");

// GET PRODUCTS (ALL or By TYPE)
router.get("/", catchAsync(products.getAllProducts));

// GET PRODUCTS (By CATEGORY or By CATEGORY + TYPE)
router.get("/:cat", catchAsync(products.getProductsByCategory));

// GET PRODUCTS (By CATEGORY + SUBCATEGORY or By CATEGORY + SUBCATEGORY + TYPE)
router.get(
  "/:cat/:subcat",
  catchAsync(products.getProductsByCategoryAndSubcategory)
);

module.exports = router;
