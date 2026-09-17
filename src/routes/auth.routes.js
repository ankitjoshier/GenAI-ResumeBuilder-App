const authController  = require('../controller/auth.controller');
const { Router } = require("express");

const authRouter = Router();

c
/***
 * @route POST / api/auth/reqister
 * @description Register a new User
 * @access Public
 */
authRouter.post("/register",authController.registerUserController);
});

module.exports = Router;
