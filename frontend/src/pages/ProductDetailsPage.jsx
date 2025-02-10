import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

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

  const handleAddToCart = () => {
    console.log("Added to cart:", { ...product, quantity });
    alert("Product added to cart!");
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
    <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</div>

          <div className="col-md-4">
            <h2>{product.title}</h2>
            <p className="text-muted">{product.category}</p>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <div className="d-flex align-items-center gap-3 my-3">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control w-25"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <button className="btn btn-primary me-3" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>Book Now</button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
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
                <p>Are you sure you want to book <strong>{product.title}</strong>?</p>
                <p>Quantity: {quantity}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={() => alert("Booking confirmed!")}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
