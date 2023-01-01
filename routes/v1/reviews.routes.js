const express = require("express");
const reviewsController = require("../../controllers/reviews.controller");
const router = express.Router();

router.route("/").get(reviewsController.getAllReviews).post(reviewsController.postReviews)

router.route("/:id").delete(reviewsController.deleteAReview)

module.exports = router;
