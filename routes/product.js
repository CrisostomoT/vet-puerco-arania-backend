const router = require("express").Router();

const ProductController = require("../controllers/productController");

const {
  productList,
  productAdd,
  productSearchById,
  productUpdate,
  productRemove,
} = ProductController;

router.route("/").get(productList).post(productAdd);

router
  .route("/:id")
  .get(productSearchById)
  .put(productUpdate)
  .delete(productRemove);

module.exports = router;
