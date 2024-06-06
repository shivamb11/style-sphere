const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const Product = require("../models/Product");
const Order = require("../models/Order");
const { verifyToken } = require("../middlewares");
const { catchAsync } = require("../utilities");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const CLIENT_URL = process.env.CLIENT_URL;

// Card No. 4000 0035 6000 0008

router.post(
  "/stripe-checkout",
  verifyToken,
  catchAsync(async (req, res) => {
    const { products } = req.body;
    let totalPrice = 0;

    const lineItems = await Promise.all(
      products?.map(async (product) => {
        const item = await Product.findById(product._id);
        totalPrice +=
          Math.round(item.price - (item.price * item.discount) / 100) *
          100 *
          product.quantity;

        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount:
              Math.round(item.price - (item.price * item.discount) / 100) * 100,
          },
          quantity: product.quantity,
        };
      })
    );

    const uid = uuid();

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer_email: `${req.body.user_email}`,
      mode: "payment",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: `${CLIENT_URL}/order/${uid}?payment=true`,
      cancel_url: `${CLIENT_URL}/order/${uid}?payment=false`,
    });

    const newOrder = new Order({
      uid,
      orderId: session.id,
      products,
      totalPrice,
    });
    await newOrder.save();

    res.status(200).json({ stripeSession: session });
  })
);

module.exports = router;
