const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    /**
     * 1. check if token exists
     * 2. if not token send res
     * 3. decode the token
     * 4. if valid call next()
     */

    const token = JSON.parse(req.headers?.authorization?.split(" ")?.[1]) || req.headers?.authorization?.split(" ")?.[1]
    if (!token) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        message: "Please login first",
        error: "Your'e not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // console.log("decoded", decoded);
    // console.log("verifyToken", User.findOne({ email: decoded.email }));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      status: "failed",
      code: 403,
      message: "Your token is expired, Please login again",
      error: "Invalid token",
    });
  }
};
