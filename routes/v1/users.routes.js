const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users.controller");
const uploader = require("../../middleware/uploader");
const verifyToken = require("../../middleware/verifyToken");

router
  .route("/register")
  .get(userController.getAllUser)
  .post(userController.registerUser);

router.route("/login").post(userController.login);
router.get("/me", verifyToken, userController.getMe);

router.route("/register/change-password/:id").patch(userController.changePassword);

router
  .route("/:id")
  // .get(userController.getAUserByID)
  .delete(userController.deleteAUserByID);

router
  .route("/register/:id")
  .get(userController.getAUserByID)
  .put(uploader.single("imageURL"), userController.UpdateProfileById);

module.exports = router;
