const { promisify } = require("util");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    /**
     * 1. check if token exists
     * 2. if not token send res
     * 3. decode the token
     * 4. if valid call next()
     */

    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "failed",
        code: 400,
        code: 400,
        error: "Your'e not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log("verifyToken", User.findOne({ email: decoded.email }));
    // req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      status: "failed",
      code: 400,
      error: "Invalid token",
    });
  }
};
