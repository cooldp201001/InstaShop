const mongoose = require('mongoose');
const Product = require('../models/productModel');

const getCategories = async (req,res) => {
  try {
    const categories = await Product.distinct('category');
    console.log('Categories:', categories);
    res.send(categories);

} catch (error) {
    console.error('Error fetching categories:', error);
  }
};





module.exports= {getCategories
};
