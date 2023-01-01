const mongoose = require("mongoose");
const validator = require("validator");

const productsSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    title: {
      type: String,
      required: [true, "Product Title is required"],
      minLength: [3, "Title should be at least 3 characters"],
      maxLength: [50, "Title is too large"],
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, "Price must be included"],
      min: [0, "Price can't be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [10, "Description should be at least 10 characters"],
      maxLength: [10000, "Description is too large"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image must be uploaded"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
