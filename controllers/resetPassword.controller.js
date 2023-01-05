const userService = require("../services/users.service");
const jwt = require("jsonwebtoken");
const User = require("../Models/users.model");
const bcrypt = require("bcryptjs");

module.exports.getResetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    // we need to verify id and token from params with our database
    const userExists = await User.findById({ _id: id });
    if (!userExists) {
      return res
        .status(401)
        .json({ status: "failed", code: 401, message: "User not Exist!" });
    }
    const secret = process.env.JWT_SECRET + userExists.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index.ejs", {
        email: verify.email,
        status: "Not Verified",
      });
    } catch (err) {
      console.log("err", err.message);
      // res.send("Not verified");
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get id and token",
      error: error.message,
    });
  }
};

module.exports.newPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    // we need to verify id and token from params with our database
    const userExists = await User.findById({ _id: id });

    if (!userExists) {
      return res.json({ status: "User not Exist!" });
    }
    const secret = process.env.JWT_SECRET + userExists.password;
    const verify = jwt.verify(token, secret);
    // lets hash the password
    const encryptPassword = await bcrypt.hash(password, 10);

    console.log("encryptPassword", encryptPassword);
    // update user new password with checking id
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: encryptPassword,
        },
      }
    );

    return res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    // here is the verify error ==> false
    console.log("err", error);
    // res.send("Not verified");
    res.json({ status: "something went wrong" });
  }
};
