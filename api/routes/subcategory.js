const express = require("express");
const router = express.Router();

const Subcategory = require("../models/Subcategory");

// GET SUBCATEGORIES
router.get("/", async (req, res) => {
  const subcategories = await Subcategory.find({});

  res.send(subcategories);
});

// ADD SUBCATEGORY
router.post("/", async (req, res) => {
  const { name } = req.body;

  const subcategory = new Subcategory({ name });

  await subcategory.save();

  res.send(subcategory);
});

// DELETE SUBCATEGORY
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await Subcategory.findByIdAndDelete(id);

  res.send("Subcategory deleted successfully");
});

// DELETE SUBCATEGORIES
router.delete("/", async (req, res) => {
  await Subcategory.deleteMany({});

  res.send("Subcategories deleted successfully");
});

module.exports = router;
