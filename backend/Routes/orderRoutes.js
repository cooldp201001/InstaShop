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
// export default placeOrder;

module.exports = orderRouter;