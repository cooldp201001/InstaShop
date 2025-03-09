const express = require("express");
const User = require("../models/userModel"); // Assuming UserModel is in the models directory
const loginRouter = express.Router();
const jwtUtils = require('../utils/jwtUtils')

// Login Route
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // console.log("from login Router", typeof(user._id))
   // Generate a JWT token
   let userInfo = {
     id: user._id,
     name: `${user.firstName}  ${user.lastName}`,
     email: user.email,
    }
    const token = jwtUtils.generateToken(userInfo);
      
    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      // httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })

    // console.log(req.cookies);
    res.cookie("token",token,{httpOnly:true});
 
    // console.log(token)
   res.json({ message: "Login successful", token });
  } catch (error) {
     console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = loginRouter;