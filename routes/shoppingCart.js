//const authCtrl = require('/ruta/a/auth.controller');
//const orderCtrl = require("../controllers/salesController");
const router = require("express").Router();
const shoppingController = require("../controllers/shoppingCartController");
const itemsController = require("../controllers/itemsController");

const {
  addToCart,
  listCart,
  searchCartById,
  toUpdateCart,
  removeCart,
  removeItemCart,
} = shoppingController;

//manejamos la ruta para procesar un pedido
router.route("/").get(listCart).post(addToCart);

router
  .route("/:product")
  .delete(removeItemCart);

router.route("/:id").delete(removeCart);

module.exports = router;
