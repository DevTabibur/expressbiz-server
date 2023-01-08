const express = require("express");
const router = express.Router();
const shippingController = require("../../controllers/shipping.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken, authorization("shipper"));
router
  .route("/")
  /**
   * @api {get} / get user's collection
   * @apiDescription Get All the users
   * @apiPermission everyone  can see access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} all the users
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .get(shippingController.getAllShipping)
  /**
   * @api {post} / user's create shipping
   * @apiDescription user's create their shipping for order
   * @apiPermission only user's  can  access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} successfully shipping completed
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only user can access the data
   */
  .post(shippingController.postShipping);

router
  .route("/:id")
  /**
   * @api {get} / get user's shipping collection
   * @apiDescription get user's shipping collection by their id
   * @apiPermission only user's  can  access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} successfully shipping completed
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only user can access the data
   */
  .get(shippingController.getAShippingById)
  /**
   * @api {delete} / delete user's shipping collection by id
   * @apiDescription delete user's shipping collection by their id
   * @apiPermission only user's  can  access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} successfully shipping completed
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only user can access the data
   */
  .delete(shippingController.deleteAShippingById)
  /**
   * @api {patch} / patch user's shipping collection
   * @apiDescription update shipping after payment completed
   * @apiPermission only user's  can  access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} successfully shipping completed
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only user can access the data
   */
  .patch(shippingController.updateShippingAfterPayment);

module.exports = router;
