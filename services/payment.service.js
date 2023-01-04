const Payment = require("../Models/payment.model");

module.exports.getAllPaymentService = async () => {
  return await Payment.find({});
};
