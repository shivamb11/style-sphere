if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

const productRouter = require("./routes/product");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const stripeRouter = require("./routes/stripe");
const orderRouter = require("./routes/order");

// Enable CORS for all routes with specific options
app.use(
  cors({
    origin: "https://style-sphere-ss.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use(mongoSanitize());

app.use("/api/product", productRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/", stripeRouter);
app.use("/api/orders", orderRouter);

app.all("*", (req, res) => {
  res.send("Page not found...");
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});

app.listen(3000, (req, res) => {
  console.log("LISTENING AT PORT 3000");
});
