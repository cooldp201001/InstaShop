const Product = require("../models/productModel");

// Get Random products
const getRandomProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          thumbnail: 1,
        },
      },
    ]);
    // console.log(products)
    return res.json(products);
  } catch {
    res.status(500).send({ error: "Error in fetching random products" });
  }
  // res.send('hello from random controller')
};

// Get random categories with images
const getCategoriesWithImages = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by category
          image: { $first: "$thumbnail" }, // Get the first image for each category
        },
      },
      {
        $project: {
          _id: 0,
          categoryName: "$_id", //rename the id to category key
          image: 1,
        },
      },
      {
        $sample: { size: 12 }, // Get 12 random categories
      },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get random reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          reviews: 1,
        },
      },
    ]);

    return res.json(reviews);
    //  console.log(reviews);
  } catch (error) {}
};

module.exports = { getRandomProducts, getCategoriesWithImages, getReviews };
