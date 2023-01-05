//stripe for payment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require("mongodb");
const paymentService = require(".././services/payment.service");

module.exports.getAllPayment = async (req, res, next) => {
  try {
    const result = await paymentService.getAllPaymentService();
    res.status(200).json({
      status: "success",
      code: 200,
      message: `successfully  get ${result.length} payments`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get payment",
      error: error.message,
    });
  }
};

module.exports.postPayment = async (req, res, next) => {
  try {
    const { price } = req.body;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully completed payment",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't post payment",
      error: error.message,
    });
  }
};

module.exports.deleteAPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Id is not valid",
      });
    }
    const result = await paymentService.deleteAPaymentService(id);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't delete payment",
      error: error.message,
    });
  }
};
