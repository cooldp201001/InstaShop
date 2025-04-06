import axios from "axios";
import React, { useState, useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useToast } from "../../context/ToastContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const { showToastMessage } = useToast();

  // Function to handle toast notifications

  // const handleActionResultToast = (action, success) => {
  //   if (action === "cart-remove") {
  //     setToastHeader("Cart Notification");
  //     if (success) {
  //       setToastMessage("Item removed from cart successfully!");
  //       setToastType("bg-success"); // Green for success
  //     } else {
  //       setToastMessage("Failed to remove item from cart. Please try again.");
  //       setToastType("bg-danger"); // Red for failure
  //     }
  //   } else if (action === "cart-update") {
  //     setToastHeader("Cart Notification");
  //     if (success) {
  //       setToastMessage("Quantity updated successfully!");
  //       setToastType("bg-success"); // Green for success
  //     } else {
  //       setToastMessage("Failed to update quantity. Please try again.");
  //       setToastType("bg-danger"); // Red for failure
  //     }
  //   }
  //   setShowToast(true); // Display the toast
  //   setTimeout(() => setShowToast(false), 4000); // Automatically hide after 4 seconds
  // };

  const handleRemoveFromCart = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/cart/remove/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        removeFromCart(id);
        // handleActionResultToast("cart-remove", true);
        showToastMessage("Item removed from cart successfully!", "Cart Notification");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      } else {
        console.error("Error removing item:", error);
        showToastMessage("Failed to remove item from cart. Please try again.", "Cart Notification", "bg-danger");
      }
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/cart/update/${id}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );
          // throw new Error('Network Error');
      if (response.status === 200) {
        updateCartItemQuantity(id, newQuantity);
        showToastMessage("Quantity updated successfully!", "Cart Notification");
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data);
      showToastMessage("Failed to update quantity. Please try again.", "Cart Notification", "bg-danger");
    }
  };

  const handleCartTotalAmount = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const handleTotalAmount = (price, quantity) => {
    return Number((price * quantity).toFixed(2));
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mx-auto   text-center text-secondary">Cart Product List</h2>
      <hr className="mb-4"/>
      {cartItems.length === 0 ? (
        <div className="alert alert-primary shadow-lg rounded text-center fs-2 " role="alert">
          <i class="fa-solid fa-box-open"></i> Cart is Empty!
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="card mb-4 shadow-lg rounded" key={item._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h2 className="card-title">{item.product.title}</h2>
                    <p>
                      <b>Brand:</b> {item.product.brand}
                    </p>
                    <p>
                      <b>Warranty Info:</b> {item.product.warrantyInformation}
                    </p>
                    <p>
                      <b>Stock Status:</b> {item.product.availabilityStatus}
                    </p>
                    <p>
                      <b>Category:</b> {item.product.category}
                    </p>
                    <p>
                      <b>Price:</b> ${item.product.price}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <label>
                        <b>Quantity:</b>
                      </label>
                      <input
                        type="number"
                        className="form-control w-25"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleUpdateQuantity(item._id, Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center gap-3">
                  <button
                    className="btn btn-danger w-50 btn-hover-effect"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove product
                  </button>
                  <button className="btn btn-info w-50 btn-hover-effect">
                    <a
                      className="text-decoration-none text-white"
                      href={`/product/${encodeURIComponent(item.product.id)}`}
                    >
                      View product
                    </a>
                  </button>
                  <div>
                    <h4 className="text-secondary">
                      Total Amount: $
                      {handleTotalAmount(item.product.price, item.quantity)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="my-4 text-end">
            <h3 className="text-secondary">
              Total Cart Amount: <span className="text-black">${handleCartTotalAmount().toFixed(2)}</span>
            </h3>
          </div>
        </div>
      )}

  

      <style>{`
      .btn-hover-effect {
        transition: all 0.3s ease;
      }
      .btn-hover-effect:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        filter: brightness(85%);
      }
      .toast {
        z-index: 1055;
        opacity: 1;
      }
      .toast.hide {
        opacity: 0;
        visibility: hidden;
      }
      `}</style>
    </div>
  );
};

export default CartPage;
