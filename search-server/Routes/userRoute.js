const express = require("express");
const verifyJWT = require("../Middleware/verifyJWT");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const logoutController = require("../Controllers/logoutController");

// Router Mounting
const userRouter = express.Router();

// Routes for user registration
userRouter.route("/signup").post(userController.registerUser);
// Routes for user login
userRouter.route("/login").post(authController.loginUser);
// Routes for user logout
userRouter.route("/logout").get(verifyJWT, logoutController.logoutUser);

module.exports = userRouter;
