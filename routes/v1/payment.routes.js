const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router
  .route("/")
  /**
   * @api {get} / get user's payment collection
   * @apiDescription Get All payment
   * @apiPermission only Admin  can see access
   * @apiHeader {string} Authorization admin access token
   * @apiSuccess {Object[]} all the payments collections
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated Admin can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .get(verifyToken, authorization("admin"), paymentController.getAllPayment);

router
  .route("/create-payment-intent")
  /**
   * @api {post} / post payment
   * @apiDescription processing of payments
   * @apiPermission only User's can access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} completed payments
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated User's can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only User's can access the data
   */
  .post(verifyToken, authorization("shipper"), paymentController.postPayment);

router
  .route("/:id")
  /**
   * @api {delete} / delete payment
   * @apiDescription delete of payments
   * @apiPermission Admin and User's can  access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} completed payments
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated Admin's and User's can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only Admin's and User's can access the data
   */
  .delete(
    verifyToken,
    authorization("admin", "shipper"),
    paymentController.deleteAPayment
  );

module.exports = router;
