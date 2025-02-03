const express = require('express');
const categories = express.Router();
const {getCategories,getCategoriesWithImages} = require('../Controllers/CategoryController');

//Get all Category
categories.get('/',getCategories);

module.exports = categories