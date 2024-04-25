const Product = require("../models/Product");

module.exports.getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.send(product);
};

module.exports.addProduct = async (req, res) => {
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
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  res.send(product);
};
