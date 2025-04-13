const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  getCartItems,
  removeItemFromCart,
  updateQuantity,
} = require("../Controllers/cartController");

// POST /cart to add items to the cart
cartRouter.post("/", addToCart);

// Geting cart items
cartRouter.get("/", getCartItems);

//removing item from cart
cartRouter.delete("/remove/:id", removeItemFromCart);

//updating the quantity of iteam in cart
cartRouter.put("/update/:id", updateQuantity);

module.exports = cartRouter;
