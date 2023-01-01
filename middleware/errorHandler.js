const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    status: "failed", code:400,code:400,
    message: "Something went wrong",
    err: err.message,
  });
};
module.exports = errorHandler;
