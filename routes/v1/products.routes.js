const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/products.controller");
const uploader = require("../../middleware/uploader");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post( uploader.single("image"), productsController.postProducts);

router
  .route("/:id")
  .get(productsController.getAProductById)
  .delete(productsController.deleteAProduct)
  .patch(productsController.updateAProduct);

module.exports = router;
