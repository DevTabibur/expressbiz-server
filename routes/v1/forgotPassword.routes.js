const express = require("express");
const forgotPasswordController = require("../../controllers/forgotPassword.controller");
const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /  forgot password
   * @apiDescription forgot password can be changed
   * @apiPermission everyone can  access
   */
  .post(forgotPasswordController.postForgotPassword);

module.exports = router;
