const userModel = require("../models/user.model");
/***
 * @route POST / api/auth/register
 * @description Register a new User
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account is already exists with this address or username",
    });
  }

  console.log("Register User Controller connected");
}

module.exports = { registerUserController };
