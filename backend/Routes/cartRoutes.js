const express = require("express");
const cartRouter = express.Router();
const { addToCart } = require("../Controllers/cartController");
const Cart = require('../models/cartItemModel');

cartRouter.post("/", addToCart); // POST /cart to add items to the cart

// Geting cart items
cartRouter.get("/", async (req, res) => {
  // console.log("hello from get cart request")
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId", // This will fetch full product details
      "title price thumbnail brand category warrantyInformation availabilityStatus" // Only select necessary fields
    );
// console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Transform the response to rename `productId` to `product`
const updatedCart = cart.items.map((item) => ({
  product: item.productId, // Rename the key
  quantity: item.quantity,
  _id: item._id,
}));

// console.log(updatedCart);
res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
})

//removing item from cart
cartRouter.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;


    // Find and update the cart by removing the item
    const cart = await Cart.findOneAndUpdate(
      { "items._id": id }, 
      { $pull: { items: { _id: id } } }, 
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    // console.log(cart.items.length);
// If cart is empty after removing the item, delete the cart
if (cart.items.length === 0) {
  await Cart.findOneAndDelete({  userId: req.user.id});
  return res.json({ message: "Cart is now empty and deleted" });
}

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
  // console.log(req.params.id);
});

//updating the quantity of iteam in cart
cartRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  console.log(id,quantity);

  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": id }, 
      { $set: { "items.$.quantity": quantity } }, 
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
    
});


module.exports = cartRouter;
