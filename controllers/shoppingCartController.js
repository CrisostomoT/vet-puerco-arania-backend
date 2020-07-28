const cartModel = require("../models/shoppingCart");
const productModels = require("../models/product");


const shoppingController = {
  addToCart: async (req, res) => {
    const { product, quantity } = req.body;
    const cart = await cartModel.findOne({ customer: req.user.sub });
    if (cart) {
      const found = cart.items.find((item) => {
        
        return item.product.toString() === product;
      });
      if (found) {
        found.quantity += quantity * 1;
        cart.save();
        return res.json(cart);
      }
      let newProduct = await productModels.findOne({ _id: product });
      cart.items.push({ product: newProduct, quantity });
      try {
        cart.save();
      } catch (error) {
        console.error(error.message);
      }

      return res.json(cart);
    }
    const newCart = new cartModel({
      customer: req.user.sub,
      items: [{ product, quantity }],
    });
    const result = await newCart.save();
    return res.json(result);
  },

  listCart: async (req, res) => {
    const result = await cartModel
      .findOne({ customer: req.user.sub })
      .populate("items.product")
      .populate("customer");
    return res.json(result);
  },
  searchCartById: async (req, res) => {
    const { id } = req.params;
    const cart = await cartModel.findById(id).populate("items.product");
    return res.json({ items: cart.items.product });
  },
  toUpdateCart: async (req, res) => {
    const { id } = req.params;
    const paramsToUpdate = { ...req.body };
    const result = await cartModel.findByIdAndUpdate(id, paramsToUpdate);
    return res.json(result);
  },
  removeCart: async (req, res) => {
    const result = await cartModel.findOneAndDelete({ customer: req.user.sub });
    if (result) {
      res.json({ message: "carrito eliminado" });
    }
    res.json({ message: " carrito no encontrado" });
  },
  removeItemCart: async (req, res) => {
    const { product } = req.params;
    const cart = await cartModel
      .update(
        { customer: req.user.sub },
        { $pull: { items: { product: product } } }
      )
      .exec();
    return res.json(cart);
  },
};

module.exports = shoppingController;

