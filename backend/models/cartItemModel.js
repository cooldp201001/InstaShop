const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User collection
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,  // Assuming product ID is a number
        ref:"Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,  // Default quantity if not specified
      },
    },
  ],
});

// Create and export the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
