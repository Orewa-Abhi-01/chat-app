const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    // check if token exists in cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized User - Token not found" });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user by decoded userId and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // If no user is found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object cauuse now we know that the user is authenticated
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log("error in protectRoute middleware", error.message);

    // Handle specific errors for expired or invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { protectRoute };
