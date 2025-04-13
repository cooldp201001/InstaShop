const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Import your User model
const registerRouter = express.Router();
 const {userRegister} = require("../Controllers/registerController")
const jwtUtils = require("../utils/jwtUtils");

// Registration Route
registerRouter.post("/", userRegister);

module.exports = registerRouter;
