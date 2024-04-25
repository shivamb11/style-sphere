const bcrypt = require("bcrypt");

const User = require("../models/User");
const ExpressError = require("../ExpressError");
const { validateEmail } = require("../utilities");

module.exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  const { password, ...others } = user._doc;
  res.send(others);
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
    const hashedPass = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPass;
  }

  if (!validateEmail(req.body.email)) {
    throw new ExpressError(400, "Email not valid");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  const { password, ...others } = updatedUser._doc;

  res.status(200).send(others);
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);

  res.status(200).send("User deleted successfully");
};
