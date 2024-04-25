const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        else return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.productSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  description: Joi.string().required().escapeHTML(),
  size: Joi.array().required(),
  price: Joi.number().required().min(0),
  special: Joi.string().required().escapeHTML(),
  images: Joi.array().required(),
  discount: Joi.number().min(0),
  inStock: Joi.number().min(0),
  category: Joi.string().required().escapeHTML(),
  subcategory: Joi.string().required().escapeHTML(),
  type: Joi.string().required().escapeHTML(),
});

module.exports.userSchema = Joi.object({
  fullname: Joi.string().required().escapeHTML(),
  username: Joi.string().required().escapeHTML(),
  email: Joi.string().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
  street: Joi.string().required().escapeHTML(),
  city: Joi.string().required().escapeHTML(),
  state: Joi.string().required().escapeHTML(),
  isAdmin: Joi.boolean(),
});

// module.exports.orderSchema = Joi.object({
//   order: Joi.object({
//     fullname: Joi.string().required().escapeHTML(),
//     username: Joi.string().required().escapeHTML(),
//     email: Joi.string().required().escapeHTML(),
//     password: Joi.string().required().escapeHTML(),
//     street: Joi.string().required().escapeHTML(),
//     city: Joi.string().required().escapeHTML(),
//     state: Joi.string().required().escapeHTML(),
//     isAdmin: Joi.boolean().escapeHTML(),
//   }).required(),
// });
