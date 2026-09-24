const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    // Get token from Authorization header
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7).trim();
    }

    // Also allow token from cookie
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Token missing
    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
      });
    }

    // Remove accidental quotes
    token = token.replace(/^["']|["']$/g, "").trim();

    // Check JWT format
    if (token.split(".").length !== 3) {
      return res.status(401).json({
        message: "Invalid Token",
        error: "JWT must contain 3 parts",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.TOKEN);

    console.log("JWT verified successfully");

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid Token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
