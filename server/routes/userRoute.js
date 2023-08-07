const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.post("/forgetPassword", authController.forgetPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:name/:password")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
