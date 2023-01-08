const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/products.controller");
const authorization = require("../../middleware/authorization");
const uploader = require("../../middleware/uploader");
const verifyToken = require("../../middleware/verifyToken");

router
  .route("/")
  /**
   * @api {get} / get products
   * @apiDescription getting all products collections
   * @apiPermission everyone can access
   * @apiHeader {string} everyone
   * @apiSuccess {Object[]} successfully get products
   */
  .get(productsController.getAllProducts)
  /**
   * @api {post} / post products
   * @apiDescription posting products and details
   * @apiPermission admin can access to post products
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} successfully post products
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated admin can access
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .post(
    verifyToken,
    authorization("admin"),
    uploader.single("image"),
    productsController.postProducts
  );

router
  .route("/:id")
  .get(productsController.getAProductById)
  /**
   * @api {delete} / manage products
   * @apiDescription manage products by id
   * @apiPermission admin can access to delete products
   * @apiHeader {string} Authorization admin access token
   * @apiSuccess {Object[]} successfully deleted products
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated admin can access
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .delete(
    verifyToken,
    authorization("admin"),
    productsController.deleteAProduct
  )
  .patch(productsController.updateAProduct);

module.exports = router;
