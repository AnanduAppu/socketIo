const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request has a cookie named "userToken"
  if (req.cookies && req.cookies.userToken) {
    try {
      // Extract the token from the cookie
      token = req.cookies.userToken;

      // Decode the token
      const decoded = jwt.verify(token, process.secretKey);

      // Fetch the user from the database using the decoded user id
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // Token verification failed
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    // Token not found in cookies
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
