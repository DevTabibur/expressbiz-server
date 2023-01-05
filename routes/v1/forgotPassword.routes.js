const express = require("express");
const forgotPasswordController = require("../../controllers/forgotPassword.controller");
const router = express.Router();

router.route("/")
.get(forgotPasswordController.get)
.post(forgotPasswordController.postForgotPassword);

module.exports = router;
