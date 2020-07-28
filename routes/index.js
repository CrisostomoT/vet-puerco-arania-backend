const router = require("express").Router();
const registerRoutes = require("./register");
const loginRoutes = require("./login");
const contentRoutes = require("./content");
const userRoutes = require("./user");
const productRoutes = require("./product");
const shoppingCartRoutes = require("./shoppingCart");
const mascotaRoutes = require("./mascota");
const checkoutRoutes = require("./checkout");
const appointmentRoutes = require("./appointments");
const authenticateUser = require("../middlewares/authenticateUser");
const emailRoutes = require("./email");

// Ruta Raiz
router.get("/", (req, res, next) => res.send("Gestion de Usuarios"));
router.use("/register", registerRoutes);
router.use("/login", loginRoutes);
router.use("/public", contentRoutes);
router.use("/mascota", authenticateUser, mascotaRoutes);
router.use("/private", authenticateUser, userRoutes);
router.use("/shoppingCart", authenticateUser, shoppingCartRoutes);
router.use("/product", productRoutes);
router.use("/turnos", authenticateUser, appointmentRoutes);
router.use("/checkout", authenticateUser, checkoutRoutes);
router.use("/email", emailRoutes);

module.exports = router;
