// middleware/authMiddleware.js
const JWTutils = require("../utils/jwtUtils")
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const decoded = JWTutils.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // Attach user info to the request
  next();
};

module.exports = authenticateToken;
