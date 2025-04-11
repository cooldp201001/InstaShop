import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToastMessage } = useToast();

  // Fetching orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/order/history",
          {
            withCredentials: true,
          }
        );
        setOrders(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Canceling order
  const handleCancelOrder = async (orderId) => {
    try {
      // const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/order/cancel/${orderId}`, {
        withCredentials: true,
      });
      // throw new Error ("failed to cancel")
      setOrders(orders.filter((order) => order._id !== orderId));

      showToastMessage("order Cancel successfully!", "Order Notification");
    } catch (error) {
      console.error("Error canceling order:", error);

      showToastMessage(
        "Failed to cancel Order. Please try again",
        "Order Notification",
        "bg-danger"
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className=" text-center text-secondary">Order History</h2>
      <hr className="mb-4" />
      {loading ? (
        <div className="d-flex justify-content-center mt-5 h-100 w-100">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          ></div>
        </div>
      ) : orders.length === 0 ? (
        <div
          className="alert alert-primary text-center fs-2 shadow-lg rounded"
          role="alert"
        >
          <i className="fa-solid fa-box-open"></i> No orders found!
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-4 orderCard-hover-effect" key={order._id}>
              <div className="card mb-5 shadow-lg">
                <img
                  src={order.items[0]?.productId?.thumbnail}
                  alt="Product"
                  className="card-img-top"
                  width="100%"
                />
                <div className="card-body pt-0">
                  <h4 className="card-title">
                    {order.items[0]?.productId?.title}
                  </h4>
                  <p className="card-text ">
                    Quantity: {order.items[0]?.quantity} <br />
                    Total Price: ${order.totalAmount.toFixed(2)} <br />
                    Status:{" "}
                    <span
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
                    </span>{" "}
                    <br />
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  {order.status === "Pending" && (
                    <button
                      className="btn btn-outline-danger shadow-lg  "
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
