const Reviews = require("../Models/reviews.model");

module.exports.getAllReviewsService = async () => {
  return await Reviews.find({});
};

module.exports.postReviewsService = async (data) => {
  return await Reviews.create(data);
};

module.exports.deleteAReviewService = async (id) => {
  return await Reviews.deleteOne({ _id: id });
};
