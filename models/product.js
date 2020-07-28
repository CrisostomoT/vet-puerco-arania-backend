const { Schema, Types, model } = require("mongoose");

const productModel = new Schema({
  name: {
    type: String,
    unique: true,
  },
  brand: {
    type: String,
  },
  details: {
    type: String,
  },
  urlImage: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  productCart: {
    type: Types.ObjectId,
    ref: "cart",
  },
});

const Product = model("product", productModel);

module.exports = Product;
