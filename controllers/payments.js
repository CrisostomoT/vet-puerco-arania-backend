const mercadopago = require("mercadopago");
const cartModel = require("../models/shoppingCart");
const productModel = require("../models/product");
const salesModel = require("../models/sales");

const Payments = {
  checkout: async (req, res, next) => {
    const cart = await cartModel
      .findOne({ customer: req.user.sub })
      .populate("items")
      .populate("items.product");
    const preferences = {
      items: [],
      back_urls: {
        success: "http://localhost:3000/payment-success",
        failure: "http://localhost:3000/payment-failure",
        pending: "http://localhost:3000/payment-pending",
      },
      auto_return: "approved",
    };
    cart.items.map((item) => {
      preferences.items.push({
        id: item.product._id,
        title: item.product.name,
        category_id: item.product.category,
        unit_price: item.product.price,
        quantity: item.quantity,
      });
    });
    try {
      const payment = await mercadopago.preferences.create(preferences);
      return res.json({ redirectUrl: payment.body.init_point });
    } catch (error) {
      res.status(500).json({ failure: error.message });
    }
  },
  confirmPayment: async (req, res, next) => {
    const { collection_id } = req.body;
    try {
      const response = await mercadopago.payment.get(collection_id);
      const { status, transaction_details } = response.response;

      if (status === "approved") {
        const sale = await salesModel.findOne({ collection_id });
        if (!sale) {
          const cart = await cartModel
            .findOne({ customer: req.user.sub })
            .populate("items")
            .populate("items.product");
          const details = cart.items.map((item) => {
            return {
              id: item.product._id,
              productName: item.product.name,
              unitPrice: item.product.price,
              quantity: item.quantity,
              totalPrice: item.product.price * item.quantity,
            };
          });
          const newSale = new salesModel({
            collection_id,
            details,
            status,
            totalPayment: transaction_details.total_paid_amount,
          });
          await newSale.save();
          for (const { product, quantity } of cart.items) {
            product.stock -= quantity;
            await product.save();
          }
          await cartModel.findOneAndDelete({ _id: cart._id });
        }
      }
      res.send({
        status,
        transactionDetails: transaction_details,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = Payments;
