const Product = require("../models/Product");
const { capitalize } = require("../utilities");

module.exports.getAllProducts = async (req, res) => {
  const { type } = req.query;
  const { special } = req.query;
  const { name } = req.query;
  let products = [];
  const regex = new RegExp(name, "i"); // i for case insensitive

  if (type) {
    products = await Product.find({ type: capitalize(type) });
  } else if (name) {
    products = await Product.find({ title: { $regex: regex } });
  } else if (special) {
    products = await Product.find({ special }).limit(4);
  } else {
    products = await Product.find({});
  }

  res.send(products);
};

module.exports.getProductsByCategory = async (req, res) => {
  const { cat } = req.params;
  const { type } = req.query;
  let products = [];

  if (type) {
    products = await Product.find({
      category: capitalize(cat),
      type: capitalize(type),
    });
  } else {
    products = await Product.find({ category: capitalize(cat) });
  }

  res.send(products);
};

module.exports.getProductsByCategoryAndSubcategory = async (req, res) => {
  const { cat, subcat } = req.params;
  const { type } = req.query;
  let products = [];

  if (type) {
    products = await Product.find({
      category: capitalize(cat),
      subcategory: capitalize(subcat),
      type: capitalize(type),
    });
  } else {
    products = await Product.find({
      category: capitalize(cat),
      subcategory: capitalize(subcat),
    });
  }

  res.send(products);
};
