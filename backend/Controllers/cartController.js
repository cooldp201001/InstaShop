const Cart = require("../models/cartItemModel");

// Handle add to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.productId == productId
      );

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
      select:
        "title category price warrantyInformation availabilityStatus thumbnail",
    });

    // Find the newly added product in the updated cart
    const addedItem = updatedCart.items.find(
      (item) => item.productId._id.toString() === productId
    );

    res.status(200).json({
      product: addedItem.productId, // This now includes full product details
      quantity: addedItem.quantity,
      _id: addedItem._id,
    });

    // console.log("cartController",addedItem);
    // res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Geting cart items
const getCartItems = async (req, res) => {
  // console.log("hello from get cart request")
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId", // This will fetch full product details
      "title id price thumbnail brand category warrantyInformation availabilityStatus" // Only select necessary fields
    );
    // console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Transform the response to rename `productId` to `product`
    // console.log(cart)
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
};

//removing item from cart
const removeItemFromCart = async (req, res) => {
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
      await Cart.findOneAndDelete({ userId: req.user.id });
      return res.json({ message: "Cart is now empty and deleted" });
    }

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
  // console.log(req.params.id);
};

//updating the quantity of iteam in cart
const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  console.log(id, quantity);

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
};
module.exports = {
  addToCart,
  getCartItems,
  removeItemFromCart,
  updateQuantity,
};
