const jwt = require("jsonwebtoken");
const userService = require("../services/users.service");
const nodemailer = require("nodemailer");


// generate the reset token link
/**
 * 1. check if user is exists
 * 2. if not exists send res
 */
module.exports.postForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // checking if user is already in our db, or not?
    const userExists = await userService.findAUserByMail(email);
    if (!userExists) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "No user found. Please create an account",
      });
    }
    const secret = process.env.JWT_SECRET + userExists.password;
    const payload = {
      id: userExists?._id,
      name: userExists?.name,
      email: userExists?.email,
      role: userExists?.role,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: "5m",
    });

    const link = `http://localhost:5000/api/v1/reset-password/${userExists._id}/${token}`;

    // send link with gmail
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tobiburrohman2@gmail.com",
        pass: process.env.NODE_MAILER_PASS,
      },
    });

    var mailOptions = {
      from: "tobiburrohman2@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Your Reset Link is: ${link}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({
          status: "failed",
          code: 400,
          message: "failed to send link in mail",
          error: error.message,
        });
      } else {
        res
          .status(200)
          .json({ status: "success", code: 200, message: "Email was sent!" });
      }
    });

    // console.log("link", link);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't send reset link",
      error: error.message,
    });
  }
};
