const mongoose = require("mongoose");
const validator = require("validator");


const reviewsSchema = mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide a valid Email"],
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
  },
  reviewer: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name should be at least 3 characters"],
    maxLength: [50, "Name is too large"],
    uppercase: true,
  },
  review: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Description should be at least 10 characters"],
    maxLength: [10000, "Description is too large"],
    trim: true,
  },
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
