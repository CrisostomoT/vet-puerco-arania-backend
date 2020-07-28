const ProductModel = require("../models/product");

const ProductController = {
  productList: async (req, res) => {
    const result = await ProductModel.find();
    res.json(result);
  },
  productAdd: async (req, res) => {
    const { name, brand, details, urlImage, price, stock, category } = req.body;
    const product = new ProductModel({
      ...req.body,
      name,
      brand,
      details,
      urlImage,
      price,
      stock,
      category,
    });
    const result = await product.save();
    return res.json(result);
  },
  productSearchById: async (req, res) => {
    const { id } = req.params;
    const result = await ProductModel.findById(id);
    res.json(result);
  },

  productUpdate: async (req, res) => {
    const { id } = req.params;
    // const { price, stock } = req.body
    const paramsToUpdate = { ...req.body };
    try {
      const result = await ProductModel.findByIdAndUpdate(id, paramsToUpdate);
    return res.json(result);
    } catch (error) {
      res.json(error)
    }
  },
  productRemove: async (req, res) => {
    const { id } = req.params;
    const result = await ProductModel.findByIdAndDelete(id);
    return res.json(result);
  },
};

module.exports = ProductController;
