const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ExpressError = require("../ExpressError");
const User = require("../models/User");

module.exports.register = async (req, res) => {
  const { fullname, username, email, password, street, city, state } = req.body;

  let checkUser = await User.findOne({ username });
  if (checkUser) {
    throw new ExpressError(400, "Username already registered.");
  }
  checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new ExpressError(400, "Email id already registered.");
  }

  const user = new User({
    fullname,
    username,
    email,
    password,
    street,
    city,
    state,
  });

  await user.save();

  const { password: savedPassword, ...others } = user._doc;

  const accessToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.send({ id: user._id, ...others, accessToken });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    throw new ExpressError(401, "Username or password is invalid");
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new ExpressError(401, "Username or password is invalid");
  }

  const { fullname, email, isAdmin, id } = user;

  const accessToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.send({ fullname, email, isAdmin, id, accessToken });
};
