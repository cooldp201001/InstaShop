import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import { useToast } from "../../context/ToastContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(true);
  const { showToastMessage } = useToast();

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
      // throw new Error('error in fetch product')
      setProduct(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error fetching product details", error);
    }
  };

  useEffect(() => {
    if (product)
      setTotalAmount(Number((product.price * orderQuantity).toFixed(2)));
  }, [product, orderQuantity]);

  const handleAddToCart = async (product) => {
    try {
      // const token = localStorage.getItem("token"); // Get the user's token
      const response = await axios.post(
        "http://localhost:3000/cart",
        {
          productId: product._id, // Send product ID and quantity to the backend
          quantity: product.cartQuantity || 1, // Default quantity is 1 (you can adjust as needed)
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const items = response.data;
        // throw new Error("Product already exists in cart");
        addToCart(items); // Update context state

        showToastMessage(
          "Item added to cart successfully!",
          "Cart Notification"
        );
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // alert("Failed to add product to cart.");
      // handleActionResultToast("cart", false);
      showToastMessage(
        "Failed to add item to cart. Please try again.",
        "Cart Notification",
        "bg-danger"
      );
    }
  };
  const handlePlaceOrder = async () => {
    // setShowModal(true);
    try {
      // const token = localStorage.getItem("token");
      const orderInfo = {
        productId: product._id,
        quantity: orderQuantity,
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
      // console.log(response.data);
      //  throw new Error('Error adding product to cart');

      // alert("Order placed successfully");
      // console.log(orderInfo);
      showToastMessage("Order placed successfully!", "Order Notification");
    } catch (e) {
      console.error("Error placing order:", e);
      // alert("Failed to place order.");
      // handleActionResultToast("order", false);
      showToastMessage(
        "Failed to placed successfully!",
        "Order Notification",
        "bg-danger"
      );
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  // Function to handle toast update
  // const handleActionResultToast = (action, success) => {
  //   if (action === "order") {
  //     setToastHeader("Order Notification");
  //     if (success) {
  //       setToastMessage("Order placed successfully!");
  //       setToastType("bg-success"); // Green for success
  //     } else {
  //       setToastMessage("Failed to place the order. Please try again.");
  //       setToastType("bg-danger"); // Red for failure
  //     }
  //   } else if (action === "cart") {
  //     setToastHeader("Cart Notification");
  //     if (success) {
  //       setToastMessage("Item added to cart successfully!");
  //       setToastType("bg-success"); // Green for success
  //     } else {
  //       setToastMessage("Failed to add item to cart. Please try again.");
  //       setToastType("bg-danger"); // Red for failure
  //     }
  //   }
  //   setShowToast(true); // Display the toast
  //   // Automatically hide the toast after 4 seconds
  //   setTimeout(() => setShowToast(false), 4000);
  // };
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="alert alert-danger text-center fs-3 m-5 shadow-lg rounded"
        role="alert"
      >
        <i className="fa-solid fa-circle-exclamation"></i> Error in fatching the
        product
      </div>
    );
  }
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
              <div className="carousel-indicators ">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
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
                className="carousel-control-prev"
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
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-floating ">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingQuantity"
                      value={cartQuantity}
                      min="1"
                      onChange={(e) => setCartQuantity(Number(e.target.value))}
                      placeholder="Quantity"
                      required
                    />
                    <label htmlFor="floatingQuantity">Quantity</label>
                  </div>
                </div>
                <button
                  className="btn btn-primary me-3 btn-lg shadow-lg addTocartBtn col"
                  onClick={() => handleAddToCart({ ...product, cartQuantity })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {/* Order Placement Form */}
      <div className="card my-5 shadow-lg orderPlaceForm">
        <div className="card-body">
          <h3 className="card-title text-center my-2">Place Order</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Still prevent default to handle custom submission logic
              handlePlaceOrder(); // Call order placement logic
            }}
          >
            {/* Street, Landmark, City */}
            <div className="row mb-3">
              <div className="col-md-4 mb-2">
                <div className="form-floating shadow">
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
              <div className="col-md-4  mb-2">
                <div className="form-floating shadow">
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
              <div className="col-md-4  ">
                <div className="form-floating shadow">
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
              <div className="col-md-4 mb-2">
                <div className="form-floating shadow">
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
                  <label htmlFor="floatingState" >State</label>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="form-floating shadow">
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
              <div className="col-md-4 mb-2">
                <div className="form-floating shadow">
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
              <div className="col-md-4 mb-2">
                <div className="form-floating shadow">
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
              <div className="col-md-4 mb-2">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control shadow"
                    id="floatingQuantity"
                    value={orderQuantity}
                    min="1"
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    placeholder="Quantity"
                    required
                  />
                  <label htmlFor="floatingQuantity">Quantity</label>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <h3 className="fw-bold m-0">
                  Total Amount:
                  <span className="text-success"> ${totalAmount}</span>
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

      <style>{`.carousel-control-next,.carousel-control-prev,.carousel-indicators {
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

.custom-shadow {
   box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
 
.orderPlaceForm label {
 color:grey
}
        `}</style>
    </div>
  );
};
export default ProductDetails;
