const productsService = require("../services/products.service");

module.exports.getAProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.getAProductByIdService(id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully Load a product with id",
      data: result,
    });
  } catch (error) {
    req.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't load a product with id",
      error: error.message,
    });
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await productsService.getAllProductsService();
    res.status(200).json({
      status: "success",
      code: 200,
      message: `successfully getting ${result.length} products`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Failed  get all products",
      code: 400,
      error: error.message,
    });
  }
};

module.exports.postProducts = async (req, res, next) => {
  try {
    const result = await productsService.postProductsService(
      req.body,
      req.file
    );
    res.status(200).json({
      status: "success",
      message: "successfully posting products",
      code: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to post products",
      code: 400,
      error: error.message,
    });
  }
};

module.exports.deleteAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteAProductService(id);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't delete this product",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully deleted this product",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't delete this product",
      error: err.message,
    });
  }
};

module.exports.updateAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.updateAProductService(id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Successfully updated",
    });
  } catch (err) {
    req.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't update this product",
      error: err.message,
    });
  }
};
