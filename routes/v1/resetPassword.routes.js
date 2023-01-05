const express = require("express");
const router = express.Router();
const resetPassword = require("../../controllers/resetPassword.controller");
// checking user id and token is proper or not
router
  .route("/:id/:token")
  .get(resetPassword.getResetPassword)
  .post(resetPassword.newPassword);

module.exports = router;
