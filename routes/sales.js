const router = require("express").Router();
const salesController = require("../controllers/sales");

//manejamos la ruta para procesar un pedido
router
  .route("/")

  .post(salesController.addToSales);

module.exports = router;
