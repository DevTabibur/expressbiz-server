const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment.controller");

router.route("/").get(paymentController.getAllPayment);

router.route("/create-payment-intent").post(paymentController.postPayment);

router.route("/:id").delete(paymentController.deleteAPayment)

module.exports = router;
