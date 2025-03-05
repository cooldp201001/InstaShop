// middleware/authMiddleware.js
const JWTutils = require("../utils/jwtUtils")
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Extract token from "Bearer <token>"
  // console.log('from authMiddle',token)
  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  const decoded = JWTutils.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Authentication failed. Invalid or expired token." });
  }

  req.user = decoded; // Attach user info to the request
  next();
};

module.exports = authenticateToken;
