const User = require("../Models/users.model");

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    const requester = req.decoded?.email;
    console.log("requester", requester);
    const requesterAccount = await User.findOne({ email: requester });
    console.log("requesterAccount", requesterAccount);
    if (!requesterAccount) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "User is not exists!",
      });
    } else if (requesterAccount.role === "admin") {
      next();
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "couldn't got this ADMIN",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "couldn't got this ADMIN",
      error: error.message,
    });
  }
};
