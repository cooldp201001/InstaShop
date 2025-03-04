import React, { useState, useEffect,useContext } from "react";
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
      const response = await axios.get(`http://localhost:3000/product/${encodeURIComponent(id)}`);
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
      const token = localStorage.getItem("token"); // Get the user's token
      const response = await axios.post(
        "http://localhost:3000/cart",
        {
          productId: product._id, // Send product ID and quantity to the backend
          quantity: product.quantity || 1, // Default quantity is 1 (you can adjust as needed)
        },
        {
          withCredentials:true
          
        }
      );

      if (response.status === 200) {
        const items = response.data;
        alert("Product added to cart!");
        addToCart(items); // Update context state
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
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
     const response = await axios.post(
        "http://localhost:3000/order",
        {
          orderInfo: orderInfo,
        },
        {
          withCredentials:true
          ,
        }
      );
      console.log(response.data);
      setShowModal(false);
      
      alert("Order placed successfully");
      // console.log(orderInfo);
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
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {product.images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img src={image} className="d-block w-100" alt={`${product.title} ${index + 1}`} />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <h2 className="mb-3">{product.title}</h2>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <p className="text-success">Discount: {product.discountPercentage}%</p>
            <p>Rating: ⭐ {product.rating}</p>
            <p className="text-muted">{product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>SKU: {product.sku}</p>
            <p>Stock: {product.stock > 0 ? `${product.stock} items available` : "Out of Stock"}</p>
            <p>Weight: {product.weight}g</p>
            <p>Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Status: {product.availabilityStatus}</p>
         

            <button className="btn btn-primary me-3" onClick={() => handleAddToCart({ ...product, quantity })}>
              Add to Cart
            </button>
          
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      
{/* Order Placement Form */}
<div className="card my-5">
  <div className="card-body">
    <h3 className="card-title">Place Order</h3>
    <form>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Street:</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Landmark:</label>
          <input
            type="text"
            className="form-control"
            name="landmark"
            value={address.landmark}
            onChange={handleAddressChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Postal Code:</label>
          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={address.postalCode}
            onChange={handleAddressChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Country:</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-md-8 d-flex align-items-end">
          <div className="row w-100">
            <div className="col-md-6">
              <label className="form-label">Quantity:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mt-5 mb-0">
                Total Amount: <span className="text-success">${totalAmount}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </form>
  </div>
</div>



      {/* Customer Reviews */}
      {product?.reviews && (
        <div className="mt-5">
          <h3 className="mb-4">Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className="card mb-4 shadow-lg border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title text-primary">{review.reviewerName}</h5>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </small>
                </div>
                <p className="text-muted mb-2">
                  <strong>Email:</strong> {review.reviewerEmail}
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> ⭐ {review.rating}
                </p>
                <p className="text-dark">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Booking</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to book <strong>{product.title}</strong>?
                </p>
                <p>Quantity: {quantity}</p>
                <p>Price: ${totalAmount}</p>
            
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handlePlaceOrder}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
)
}
export default ProductDetails;
