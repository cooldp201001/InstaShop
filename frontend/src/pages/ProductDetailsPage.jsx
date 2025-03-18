import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/cartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
  const [address, setAddress] = useState({
    street: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/${encodeURIComponent(id)}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  useEffect(() => {
    if (product) setTotalAmount(Number((product.price * quantity).toFixed(2)));
  }, [product, quantity]);

  const handleAddToCart = async (product) => {
    try {
      // const token = localStorage.getItem("token"); // Get the user's token
      const response = await axios.post(
        "http://localhost:3000/cart",
        {
          productId: product._id, // Send product ID and quantity to the backend
          quantity: product.quantity || 1, // Default quantity is 1 (you can adjust as needed)
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const items = response.data;
        
        addToCart(items); // Update context state
        setToastMessage("Product added to your cart!");
        setShowToast(true);

        // Automatically hide the toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };
  const handlePlaceOrder = async () => {
    // setShowModal(true);
    try {
      // const token = localStorage.getItem("token");
      const orderInfo = {
        productId: product._id,
        quantity: quantity,
        price: totalAmount,
        address: {
          street: address.street,
          landmark: address.landmark,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        },
        phone: phone,
      };
      console.log(orderInfo);
      const response = await axios.post(
        "http://localhost:3000/order",
        {
          orderInfo: orderInfo,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      // alert("Order placed successfully");
      // console.log(orderInfo);
      setToastMessage("Order placed successfully!");
      setShowToast(true);

      // Automatically hide the toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    
    } catch (e) {
      console.error("Error placing order:", e);
      alert("Failed to place order.");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid mt-4 text-black">
      {product ? (
        <div className="row">
          <div className="col-md-8">
            <div
              id="productCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={`${product.title} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev "
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>

          <div className="col-md-4 fs-5">
            <h2 className="mb-3">{product.title}</h2>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <p className="text-success">
              Discount: {product.discountPercentage}%
            </p>
            <p>Rating: ⭐ {product.rating}</p>
            <p className="text-muted">{product.category}</p>
            <p>Brand: {product.brand}</p>
            {/* <p>SKU: {product.sku}</p> */}
            <p>
              Stock:{" "}
              {product.stock > 0
                ? `${product.stock} items available`
                : "Out of Stock"}
            </p>
            <p>Weight: {product.weight}g</p>
            <p>
              Dimensions: {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Status: {product.availabilityStatus}</p>

            <button
              className="btn btn-primary me-3 btn-lg shadow-lg addTocartBtn"
              onClick={() => handleAddToCart({ ...product, quantity })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {/* Order Placement Form */}
      <div className="card my-5 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-center my-2">Place Order
            </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Still prevent default to handle custom submission logic
              handlePlaceOrder(); // Call order placement logic
            }}
          >
            {/* Street, Landmark, City */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingStreet"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Street"
                    required
                  />
                  <label htmlFor="floatingStreet">Street</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLandmark"
                    name="landmark"
                    value={address.landmark}
                    onChange={handleAddressChange}
                    placeholder="Landmark"
                    required
                  />
                  <label htmlFor="floatingLandmark">Landmark</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCity"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    required
                  />
                  <label htmlFor="floatingCity">City</label>
                </div>
              </div>
            </div>

            {/* State, Postal Code, Country */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingState"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    required
                  />
                  <label htmlFor="floatingState">State</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPostalCode"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    placeholder="Postal Code"
                    required
                  />
                  <label htmlFor="floatingPostalCode">Postal Code</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCountry"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    placeholder="Country"
                    required
                  />
                  <label htmlFor="floatingCountry">Country</label>
                </div>
              </div>
            </div>

            {/* Phone and Quantity */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control"
                    id="floatingPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    required
                  />
                  <label htmlFor="floatingPhone">Phone</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingQuantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Quantity"
                    required
                  />
                  <label htmlFor="floatingQuantity">Quantity</label>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <h3 className="fw-bold m-0">
                  Total Amount:{" "}
                  <span className="text-success">${totalAmount}</span>
                </h3>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-3 shadow-lg "
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Customer Reviews */}
      {product?.reviews && (
        <div className="mt-5 row">
          <h3 className="mb-4 text-center">Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card customerReviewCard h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{review.reviewerName}</h5>
                  <p className="text-warning">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                  <p className="card-text">"{review.comment}"</p>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
{/* Toast Notification for add to cart*/}
<div
                className={` bg-success toast position-fixed bottom-0 end-0 m-3 ${showToast ? "show" : "hide"}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                // style={{ zIndex: 1055 }}
            >
                <div className="toast-header">
                    <strong className="me-auto">Cart Notification</strong>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowToast(false)}
                    ></button>
                </div>
                <div className="toast-body">{toastMessage}</div>
            </div>
            {/* Toast Notification for order place */}
<div
                className={` bg-success toast position-fixed bottom-0 end-0 m-3 ${showToast ? "show" : "hide"}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                // style={{ zIndex: 1055 }}
            >
                <div className="toast-header">
                    <strong className="me-auto">Order Notification</strong>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowToast(false)}
                    ></button>
                </div>
                <div className="toast-body text-white"><h6>{toastMessage}</h6> </div>
            </div>
      <style>{`.carousel-control-next,.carousel-control-prev {
    // background-color:red;
    
    filter: invert(100%);
}
.btn {
transition: transform 0.3s ease, box-shadow 0.3s ease;}
    .btn:hover {
  transform: scale(1.1); /* Scales the button by 10% on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a shadow for depth */
}
 .customerReviewCard {
  border: none; /* Removes the border */
/* Keeps a clean white background */
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  overflow: hidden; /* Prevents content from overflowing */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adds hover effect */
}

.customerReviewCard:hover {
  transform: scale(1.08); /* Slight lift on hover */
  box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 15px; /* Enhanced shadow on hover */
}

 
        `}</style>
    </div>
  );
};
export default ProductDetails;
