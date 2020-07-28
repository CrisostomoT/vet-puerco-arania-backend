const router = require("express").Router();

const UserController = require("../controllers/userController");

router.route("/").post(UserController.createUser);

module.exports = router;
