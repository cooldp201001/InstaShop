const express = require('express');

const orderRouter = express.Router();
const Order = require("../models/orderModel");
orderRouter.get('/',(req,res)=>{
    res.send('Hello from Get Order')
})

orderRouter.post('/', async (req, res) => {
  try {
    const { productId, quantity, price, address, phone } = req.body.orderInfo;
    const userId = req.user.id; // Assuming user ID is coming from authentication middleware

    // Create a new order
    const newOrder = new Order({
      userId,
      items: [{ productId, quantity }],
      totalAmount: price,
      address: {
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
      phone: phone
    });

    // Save order to the database
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
});

// Get order history for logged-in user
orderRouter.get("/history", async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("items.productId", "title price thumbnail") // Get product details
      .sort({ createdAt: -1 }); // Show latest orders first

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});
// Cancel an order (Only if it is still pending)
orderRouter.delete("/cancel/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Cannot cancel a processed order" });
    }

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
});

// export default placeOrder;
module.exports = orderRouter;