const Payment = require("../Models/payment.model");
const Shipping = require("../Models/shipping.model");
const sendMail = require("../utils/sendMail");

module.exports.getAllShippingService = async () => {
  return await Shipping.find({});
};

module.exports.getAShippingByIdService = async (id) => {
  return await Shipping.findById({ _id: id });
};

module.exports.postShippingService = async (data) => {
  return await Shipping.create(data);
};

module.exports.deleteAShippingByIdService = async (id) => {
  return await Shipping.deleteOne({ _id: id });
};

module.exports.updateShippingAfterPaymentService = async (id, data) => {
  const updateData = {
    price: data?.price,
    shippingOrder: data?.shippingOrder,
    transactionId: data?.transactionId,
    paid: true,
  };
  const payment = await Payment.create({
    email: data?.email,
    price: data?.price,
    shippingOrder: data?.shippingOrder,
    transactionId: data?.transactionId,
    paid: true,
  });
  // here is the nodemailer options to send email for customer completed payment
  sendMail(payment);
  return await Shipping.updateOne({ _id: id }, { $set: updateData });
};
