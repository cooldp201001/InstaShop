import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/cartContext";

const ProductDetails = () => {
  const {addToCart} = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

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

        //Add product to cart (API call version)
const handleAddToCart = async (product) => {
  try {
    const token = localStorage.getItem("token"); // Get the user's token
    const response = await axios.post(
      "http://localhost:3000/cart",
      {
        productId: product._id, // Send product ID and quantity to the backend
        quantity: product.quantity|| 1, // Default quantity is 1 (you can adjust as needed)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      const items = response.data;
      alert("Product added to cart!");
       // Update context state
       addToCart(items);
      // fetchCart();
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart.");
  }
};

  return (
    <div className="container-fluid mt-4 text-white">
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
            <div className="card mb-3">
              <div className="d-flex align-items-center justify-content-start my-3">
                <label className="fw-bold">Quantity:</label>
                <input
                  type="number"
                  className="form-control text-center w-25"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="text-center mt-2">
                <h4 className="fw-bold">
                  Total Amount: <span className="text-success">${totalAmount}</span>
                </h4>
              </div>
            </div>

            <button className="btn btn-primary me-3" onClick={() => handleAddToCart({ ...product, quantity })}>
              Add to Cart
            </button>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Book Now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

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
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={() => alert("Booking confirmed!")}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
