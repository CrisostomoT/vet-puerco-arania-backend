const { Schema, Types, model } = require("mongoose");

const SalesSchema = new Schema({
  collection_id: {
    type: String
  },
  details: [
    {
      productName: {
        type: String,
      },
      quantity: {
        type: String,
      },
      unitPrice: {
        type: String,
      },
      totalPrice: {
        type: String,
      },
    },
  ],

  status: {
    type: String,
  },
  totalPayment: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

const Sales = model("sales", SalesSchema);
module.exports = Sales;
