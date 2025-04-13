
const Product = require("../models/productModel");

// Getting all the categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    // console.log("Categories:", categories);
    res.send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

module.exports = { getCategories };
