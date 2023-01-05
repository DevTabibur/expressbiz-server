const Payment = require("../Models/payment.model");

module.exports.getAllPaymentService = async () => {
  return await Payment.find({});
};

module.exports.deleteAPaymentService = async (id) => {
  return await Payment.deleteOne({ _id: id });
};
