const { Router } = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.get("/logout", authController.logOutUserController);
authRouter.get("/get-me", authMiddleware, authController.getMeController);

module.exports = authRouter;
