const express = require('express');
const products = express.Router()
// const getAllCategories = require('../Controllers/productController');
const ProductCollection = require("../models/productModel");
const {getAllProducts,getSpecificProduct} = require('../Controllers/productController')

// Getting all prducts for the product page
products.get('/', getAllProducts)

products.get('/:id',getSpecificProduct);

module.exports =products