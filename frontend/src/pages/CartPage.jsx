import axios from "axios";
import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { CartContext } from "../../context/cartContext";
const CartPage = () => {

  const {cartItems, setCartItems, removeFromCart, updateCartItemQuantity} = useContext(CartContext);
  // const [cart, setCart] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  // const [removeItem,setRemoveItem] =useState(false); 
     

  // Remove product from cart
  const handleRemoveFromCart = async (id) => {
    try {
      // Call API to remove item from cart in the database
      const response = await axios.delete(`http://localhost:3000/cart/remove/${id}`,{
        withCredentials:true
       
      })
      if(!response)
      console.log("Error in removing the product");
      // Remove from frontend state if successful
    
      // setCartItems((prevCart) => prevCart.filter((item) => item._id !== id));
     removeFromCart(id);
      
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }
    
      console.error("Error removing item:", error);

    }
  };
  
  // Update product quantity in the cart

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity
  
    try {
      // Send update request to the backend
      const response = await axios.put(`http://localhost:3000/cart/update/${id}`, {
        quantity: newQuantity,
      },{
        withCredentials:true

      }
    );
  
      // Update state after successful backend update
      // setCartItems((prevCart) =>
      //   prevCart.map((item) =>
      //     item._id == id ? { ...item, quantity: newQuantity } : item
      //   )
      // );
      updateCartItemQuantity (id,newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error.response.data);
    }
  };
  
      //Calculate the total products price in cart;
  const handleCartTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  //function to calculate total amount for a single item
  const handleTotalAmount = (price, quantity) => {
    const total = price * quantity;
    return Number(total.toFixed(2));
  };
  return (
    <div className="container mt-4">
      <h2 className="mx-auto mb-4 w-25">Cart Product List</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="card mb-3" key={item._id}>

              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
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
                      {" "}
                      <b>Warranty Info:</b> {item.product.warrantyInformation}
                    </p>
                    <p>
                      {" "}
                      <b>Stock Status:</b> {item.product.availabilityStatus}
                    </p>
                    <p className="text-muted">
                      {" "}
                      <b>Category:</b> {item.product.category}
                    </p>
                    <p>
                      {" "}
                      <b>Price:</b> ${item.product.price}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <label>
                        <b>Quantity:</b>{" "}
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
                <div className="col-md-4  d-flex flex-column justify-content-center align-items-center gap-3">
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove from Cart
                  </button>

                  <button
                    className="btn btn-info   w-50"
                  
                  > <a className="text-decoration-none text-white" href={`/product/${encodeURIComponent(item.id)}`}>View product</a>
                  </button>

                  <button
                    className="btn btn-success w-50"
                  
                  >
                    Buy now
                  </button>

                  <div>
                    <h5>
                      Total Amount :
                      {handleTotalAmount(item.product.price, item.quantity)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <br />
          <div className="my-4">
            <h3>Total Cart Amount: ${handleCartTotalAmount().toFixed(2)}</h3>
            <button
              className="btn btn-success w-25"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
