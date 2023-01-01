const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: [true, "This Email is already in use"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //   validate: {
      //     validator: (value) =>
      //       validator.isStrongPassword(value, {
      //         minLength: 6,
      //       }),
      //     message: "Password {value} is not strong enough",
      //   },
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password don't match",
      },
    },
    role: {
      type: String,
      enum: ["shipper", "admin", "buyer"],
      default: "shipper",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name is too short"],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valid mobile number",
      // ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image"],
    },
    bio: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  (this.password = hashedPassword), (this.confirmPassword = undefined);
  next();
});

userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
  return isPasswordMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
