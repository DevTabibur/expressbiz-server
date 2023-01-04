const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  //  for update after payment completed
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
  },
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
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
