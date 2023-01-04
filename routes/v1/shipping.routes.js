const express = require("express");
const router = express.Router();
const shippingController = require("../../controllers/shipping.controller");

router
  .route("/")
  .get(shippingController.getAllShipping)
  .post(shippingController.postShipping);

router
  .route("/:id")
  .get(shippingController.getAShippingById)
  .delete(shippingController.deleteAShippingById)
  .patch(shippingController.updateShippingAfterPayment)

module.exports = router;
