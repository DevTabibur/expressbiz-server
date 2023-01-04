const { ObjectId } = require("mongodb");
const Payment = require("../Models/payment.model");
const shippingService = require("../services/shipping.service");

const sendMail = require(".././utils/sendMail");

module.exports.getAllShipping = async (req, res, next) => {
  try {
    const result = await shippingService.getAllShippingService();
    res.status(200).json({
      status: "success",
      code: 200,
      message: `successfully getting ${result.length} shipping info`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get shipping info",
      error: error.message,
    });
  }
};

module.exports.postShipping = async (req, res, next) => {
  try {
    const result = await shippingService.postShippingService(req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully posting shipping info",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't posting shipping info",
      error: error.message,
    });
  }
};

module.exports.getAShippingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This ID is not valid",
      });
    }
    const result = await shippingService.getAShippingByIdService(id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully getting shipping by id",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get shipping by id",
      error: error.message,
    });
  }
};

module.exports.deleteAShippingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This ID is not valid",
      });
    }
    const result = await shippingService.deleteAShippingByIdService(id);
    if (!result.deletedCount > 0) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't delete this product",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully deleted this product",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't delete this product",
      error: error.message,
    });
  }
};

module.exports.updateShippingAfterPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This ID is not valid",
      });
    }

    const result = await shippingService.updateShippingAfterPaymentService(
      id,
      payment
    );


    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully completed payment",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't processing the payment",
      error: error.message,
    });
  }
};
