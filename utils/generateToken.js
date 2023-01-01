const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  // console.log("userInfo", userInfo);
  const payload = {
    id:userInfo?._id,
    name: userInfo?.name,
    email: userInfo?.email,
    role: userInfo?.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });
  return token;
};

module.exports = generateToken;
