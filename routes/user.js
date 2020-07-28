const router = require("express").Router();
const userController = require("../controllers/userController");

const {
  UserList,
  userListById,
  updateUser,
  deleteUser,
  createUser,
  updateUserAdmin,
  getUser,
} = userController;

router.route("/user").get(UserList).post(createUser).put(updateUser);

router.route("/user/:id")
  .get(userListById)
  .put(updateUserAdmin)
  .delete(deleteUser);

router
  .route("/user/:id")
  .get(userListById)
  .put(updateUserAdmin)
  .delete(deleteUser);

router.route("/userlogged").get(getUser);

module.exports = router;
