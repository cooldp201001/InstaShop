// const { default: mongoose } = require("mongoose");
const mongoose = require('../db/dbConnect');
const Cart = require("../models/cartItemModel");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(item => item.productId == productId);

      if (existingItem) {
        // Update the quantity
        existingItem.quantity += quantity;
      } else {
        // Add the new product
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
      
    // Populate the latest added item
    const updatedCart = await cart.populate({
      path: "items.productId",
      select: "title category price warrantyInformation availabilityStatus thumbnail"
    });

    // Find the newly added product in the updated cart
    const addedItem = updatedCart.items.find(item => item.productId._id.toString() === productId);

    
    res.status(200).json({
      product: addedItem.productId, // This now includes full product details
      quantity: addedItem.quantity,
      _id: addedItem._id
    });


    console.log("cartController",addedItem);
    // res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


module.exports = { addToCart };
