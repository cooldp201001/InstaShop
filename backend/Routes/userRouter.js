const express = require("express");
const userRouter = express.Router();
const {getProfile,updateProfile} = require("../Controllers/userProfileController")

// Get User Profile
userRouter.get("/profile",getProfile);

// Update User Profile
userRouter.put("/profile",updateProfile);

module.exports = userRouter;
