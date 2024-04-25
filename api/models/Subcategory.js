const mongoose = require("mongoose");
const { Schema } = mongoose;

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
