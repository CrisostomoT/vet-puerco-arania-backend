const { Schema, Types, model } = require("mongoose");

const itemCartModel = new Schema({
  productItemCarModel: {
    type: Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const ItemCart = model("itemCart", itemCartModel);
module.exports = ItemCart;
