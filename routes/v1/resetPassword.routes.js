const express = require("express");
const router = express.Router();
const resetPassword = require("../../controllers/resetPassword.controller");
// checking user id and token is proper or not
router
  .route("/:id/:token")
  /**
   * @api {get} /  reset password
   * @apiDescription reset password link sent with email
   * @apiPermission everyone can  access
   */
  .get(resetPassword.getResetPassword)
  /**
   * @api {post} /  new password
   * @apiDescription new password generated
   * @apiPermission everyone can  access
   */
  .post(resetPassword.newPassword);

module.exports = router;
