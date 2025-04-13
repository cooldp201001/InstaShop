const express = require("express");
const loginRouter = express.Router();
const  login = require('../Controllers/loginController');

// Login Route
loginRouter.post("/", login);

module.exports = loginRouter;