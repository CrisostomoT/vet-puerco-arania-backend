const PaymentController = require("../controllers/payments");
const router = require("express").Router();

router.route("/").post(PaymentController.checkout);

router.route("/confirm").post(PaymentController.confirmPayment);


module.exports = router;
