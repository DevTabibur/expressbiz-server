const express = require("express");
const reviewsController = require("../../controllers/reviews.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  /**
   * @api {get} / get reviews collection
   * @apiDescription Get All user reviews
   * @apiPermission everyone  can see access
   * @apiSuccess {Object[]} all the reviews
   */
  .get(reviewsController.getAllReviews)
  /**
   * @api {post} / give reviews
   * @apiDescription post reviews / feedback
   * @apiPermission without admin everyone  can see access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} all the reviews
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only shipper can access the data
   */
  .post(verifyToken, authorization("shipper"), reviewsController.postReviews);

router
  .route("/:id")
  /**
   * @api {delete} / delete reviews
   * @apiDescription delete reviews / feedback
   * @apiPermission Only admin  can see access
   * @apiHeader {string} Authorization Admin's access token
   * @apiSuccess {Object[]} successfully deleted reviews
   * @apiError  (Unauthorized 401)  Unauthorized  Only Admin can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */ .delete(
    verifyToken,
    authorization("admin"),
    reviewsController.deleteAReview
  );

module.exports = router;
