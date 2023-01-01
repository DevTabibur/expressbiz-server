const Products = require("../Models/products.model");

module.exports.getAProductByIdService = async (id) => {
  return await Products.findById({ _id: id });
};

module.exports.getAllProductsService = async () => {
  return await Products.find({});
};

module.exports.postProductsService = async (body, file) => {
  const data = {
    email: body?.email,
    title: body?.title,
    price: body?.price,
    description: body?.description,
    image: file?.filename,
  };
  return await Products.create(data);
};

module.exports.deleteAProductService = async (id) => {
  return await Products.deleteOne({ _id: id });
};

module.exports.updateAProductService = async (id) => {
  return await Products.updateOne({ _id: id });
};
