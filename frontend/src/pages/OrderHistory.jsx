import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToastMessage } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/order/history", {
        withCredentials:true
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

    try {
      // const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/order/cancel/${orderId}`, {
        withCredentials:true
      });
      // throw new Error ("failed to cancel")
      setOrders(orders.filter((order) => order._id !== orderId));
     
      showToastMessage("order Cancel successfully!", "Order Notification");
      
    } catch (error) {
      console.error("Error canceling order:", error);
      
      showToastMessage("Failed to cancel Order. Please try again", "Order Notification","bg-danger");
     
    }
  };

  return (
    <div className="container mt-4">
    <h2 className=" text-center text-secondary">Order History</h2>
    <hr className="mb-4"/>
    {loading ? (
      <div class="d-flex justify-content-center mt-5 h-100 w-100">
      <div class="spinner-border text-primary" role="status" style={{width: "4rem", height: "4rem"}} >
      </div>
    </div> 
    ) : orders.length === 0 ? (
      <div class="alert alert-primary text-center fs-2 shadow-lg rounded" role="alert">
       <i class="fa-solid fa-box-open"></i> No orders found!
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
                    className="btn btn-danger shadow-lg "
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

    <style>
      {
        `.orderCard-hover-effect {
        // cursor:pointer;
  transition: all 0.3s ease; /* Smooth transition */
}

.orderCard-hover-effect:hover {
  transform: scale(1.05); /* Slight scaling effect */
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  // filter: brightness(85%); /* Slightly darkens the button */
}
        `
      }
    </style>
  </div>
  
  

  );
};

export default OrderHistory;
