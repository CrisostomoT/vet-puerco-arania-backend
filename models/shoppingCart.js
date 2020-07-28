const { Schema, Types, model } = require("mongoose");

const cartSchema = new Schema({
  customer: {
    type: Types.ObjectId,
    ref: "user",
  },

  items: [
    {
      product: {
        type: Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = model("cart", cartSchema);
module.exports = Cart;
