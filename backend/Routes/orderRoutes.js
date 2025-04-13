const express = require('express');
const {placeOrder, getOrderHistory, cancelOrder} = require("../Controllers/orderController")
const orderRouter = express.Router();

// Placing order
orderRouter.post('/',placeOrder);

// Get order history for logged-in user
orderRouter.get("/history", getOrderHistory);

// Cancel an order (Only if it is still pending)
orderRouter.delete("/cancel/:orderId", cancelOrder);

// export default placeOrder;
module.exports = orderRouter;