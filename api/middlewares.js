const jwt = require("jsonwebtoken");

const { productSchema, userSchema } = require("./joiSchemas");
const ExpressError = require("./ExpressError");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("You aren't authorized..");
  }

  const accessToken = authHeader.split(" ")[1];
  const decoded = jwt.verify(
    accessToken,
    process.env.JWT_SECRET,
    function (err, payload) {
      if (err) {
        return res.status(403).send("Token is not valid");
      }
      req.user = payload;
      next();
    }
  );
};

const verifyAuthorization = (req, res, next) => {
  if (req.params.id !== req.user.id && !req.user.isAdmin) {
    return res.status(403).send("You are not authorized..");
  }
  next();
};

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You are not authorized..");
  }
  next();
};

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((e) => e.message).join(", ");
    throw new ExpressError(400, message);
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((e) => e.message).join(", ");
    throw new ExpressError(400, message);
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAuthorization,
  verifyAdmin,
  validateProduct,
  validateUser,
};
