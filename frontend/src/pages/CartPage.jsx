import axios from "axios";
import React, { useState, useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useToast } from "../../context/ToastContext";

const CartPage = () => {

  const { cartItems, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);

  const { showToastMessage } = useToast();

 // Handling remove cart item functionality
  const handleRemoveFromCart = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/cart/remove/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        removeFromCart(id);
        // handleActionResultToast("cart-remove", true);
        showToastMessage(
          "Item removed from cart successfully!",
          "Cart Notification"
        );
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      } else {
        console.error("Error removing item:", error);
        showToastMessage(
          "Failed to remove item from cart. Please try again.",
          "Cart Notification",
          "bg-danger"
        );
      }
    }
  };

  // Handling update cart item quantity functionality
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
      showToastMessage(
        "Failed to update quantity. Please try again.",
        "Cart Notification",
        "bg-danger"
      );
    }
  };

  // Handling total cart price calculation
  const handleCartTotalAmount = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // calculating the total amount for a specific product
  const handleTotalAmount = (price, quantity) => {
    return Number((price * quantity).toFixed(2));
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mx-auto   text-center text-secondary">
        Cart Product List
      </h2>
      <hr className="mb-4" />
      {cartItems.length === 0 ? (
        <div
          className="alert alert-primary shadow-lg rounded text-center fs-2 "
          role="alert"
        >
          <i className="fa-solid fa-box-open"></i> Cart is Empty!
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
                    className="btn btn-danger w-50 btn-hover-effect "
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove product
                  </button>
                  <button className="btn btn-info w-50 btn-hover-effect ">
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
          <hr />
          <div className="my-4 text-end">

            <h2 className="text-secondary">
              Total Cart Amount:{" "}
              <span className="text-success fw-bold">
                ${handleCartTotalAmount().toFixed(2)}
              </span>
            </h2>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;
