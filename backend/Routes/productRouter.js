const express = require('express');
const products = express.Router()
const {getAllProducts,getSpecificProduct} = require('../Controllers/productController')

// Getting all prducts for the product page
products.get('/', getAllProducts)

// Get specific product 
products.get('/:id',getSpecificProduct);

module.exports =products