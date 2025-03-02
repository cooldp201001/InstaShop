import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/order/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/order/cancel/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      alert("Order canceled successfully");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="container mt-4">
    <h2 className="mb-4 text-center text-primary">Order History</h2>
    {loading ? (
      <p className="text-center">Loading orders...</p>
    ) : orders.length === 0 ? (
      <p className="text-center text-muted">No orders found.</p>
    ) : (
      <div className="row">
        {orders.map((order) => (
          <div className="col-md-4" key={order._id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={order.items[0]?.productId?.thumbnail}
                alt="Product"
                className="card-img-top"
                width="100%"
              />
              <div className="card-body">
                <h5 className="card-title">{order.items[0]?.productId?.title}</h5>
                <p className="card-text">
                  Quantity: {order.items[0]?.quantity} <br />
                  Total Price: ${order.totalAmount.toFixed(2)} <br />
                  Status: <span
                    className={`badge bg-${
                      order.status === "Pending"
                        ? "warning"
                        : order.status === "Shipped"
                        ? "info"
                        : order.status === "Delivered"
                        ? "success"
                        : "secondary"
                    }`}
                  >
                    {order.status}
                  </span> <br />
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                {order.status === "Pending" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelOrder(order._id)}
                    aria-label="Cancel order"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Cancel this order"
                  >
                    <i className="bi bi-x-circle"></i> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  

  );
};

export default OrderHistory;
