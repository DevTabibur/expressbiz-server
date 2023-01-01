const reviewService = require("../services/reviews.service");

module.exports.getAllReviews = async (req, res, next) => {
  try {
    const result = await reviewService.getAllReviewsService();
    res.status(200).json({
      status: "success",
      code: 200,
      message: `successfully getting ${result.length} reviews`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: `Couldn't get reviews`,
      error: error.message,
    });
  }
};

module.exports.postReviews = async (req, res, next) => {
  try {
    const result = await reviewService.postReviewsService(req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully review posted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't review posted",
      error: error.message,
    });
  }
};

module.exports.deleteAReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await reviewService.deleteAReviewService(id);
    if (!result.deletedCount > 0) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't delete review",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully deleted review",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Couldn't delete review",
      error: error.message,
    });
  }
};
