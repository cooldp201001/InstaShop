const express = require('express');
const randomRouter = express.Router()
const {getRandomProducts,getCategoriesWithImages,getReviews} = require('../Controllers/randomController')

randomRouter.get('/products',getRandomProducts);

//getRandom Categories for home page only
randomRouter.get('/categories',getCategoriesWithImages);

//Get random Reviews
randomRouter.get('/reviews',getReviews)

module.exports  =randomRouter