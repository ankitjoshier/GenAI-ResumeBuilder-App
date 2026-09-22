const authController = require("../controller/auth.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

/***
 * @route POST / api/auth/reqister
 * @description Register a new User
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/***
 * @route POST / api/auth/login
 * @description Login User with Email & Password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController);

/***
 * @route GET / api/auth/logout
 * @description clear token from use cookie and add the token in the blacklist.
 * @access Public
 */

authRouter.get("/logout", authController.logOutUserController);

/***
 * @route GET / api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRouter;
