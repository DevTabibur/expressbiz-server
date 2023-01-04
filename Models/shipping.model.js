const mongoose = require("mongoose");
const validator = require("validator");

const shippingSchema = mongoose.Schema(
  {
    senderEmail: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    senderCompanyName: {
      type: String,
      required: [true, "Company or Name is required"],
      minLength: [3, "Company or Name should be at least 3 characters"],
      maxLength: [50, "Company or Name is too large"],
      uppercase: true,
    },
    senderContact: {
      type: String,
      required: [true, "Please add Contact Number"],
    },
    senderCountry: {
      type: String,
    },
    senderOriginAddress: {
      type: String,
      require: [true, "Please add your origin address"],
    },
    senderPostalCode: {
      type: String,
    },

    receiverEmail: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    receiverCompanyName: {
      type: String,
      required: [true, "Company or Name is required"],
      minLength: [3, "Company or Name should be at least 3 characters"],
      maxLength: [50, "Company or Name is too large"],
      uppercase: true,
    },
    receiverContact: {
      type: String,
      required: [true, "Please add Contact Number"],
    },
    receiverCountry: {
      type: String,
    },
    receiverDestinationAddress: {
      type: String,
      require: [true, "Please add your origin address"],
    },
    receiverPostalCode: {
      type: String,
    },

    productName: {
      type: String,
      required: [true, "Please add product name"],
    },
    shipmentType: {
      type: String,
    },
    weight: {
      type: String,
      required: [true, "Please add your product weight"],
    },
    width: {
      type: String,
    },
    distance: {
      type: String,
      required: [true, "Couldn't get distance"],
    },

    billMethod: {
      type: String,
      default: "Card",
    },
    billDutiesTaxes: {
      type: String,
      default: "Company",
    },
    currency: {
      type: String,
      default: "tk",
    },
    //  for update payment completed
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    shippingOrder: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paid: { type: String },
  },
  { timestamps: true }
);

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
