const jwt = require("jsonwebtoken");
// require("dotenv").config()

// Function to generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload,process.env.SECRET_KEY , { expiresIn: "1h" });
};

// Function to verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
