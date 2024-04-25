const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

// GET CATEGORIES
router.get("/", async (req, res) => {
  const categories = await Category.find({});

  res.send(categories);
});

// ADD CATEGORY
router.post("/", async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  await category.save();

  res.send(category);
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  res.send("Category deleted successfully");
});

// DELETE CATEGORIES
router.delete("/", async (req, res) => {
  await Category.deleteMany({});

  res.send("Categories deleted successfully");
});

module.exports = router;
