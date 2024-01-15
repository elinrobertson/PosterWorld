const express = require("express");
const { registerUser, loginUser, logoutUser } = require("./user.controller");
const { userJoiSchema } = require("./user.model");
const { validate } = require("../../middlewares");
const userRouter = express.Router();

userRouter.post("/register", validate(userJoiSchema), registerUser);
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

module.exports = userRouter;