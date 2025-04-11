import axios from "axios";
import React, { useState, useEffect } from "react";

const PromotionalSection = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //function to get random products from DB forthe promotional section
  useEffect(() => {
    const getRandomProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/random/products"
        );
        const products = response.data;
        setRandomProducts(products);
        setError(false);
        setLoading(false);
      } catch {
        setError("failed to fetch products");
        setLoading(false);
      }
    };
    getRandomProducts();
  }, []);

  // show loading while fatching the data
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <section className="promotional-section my-1 mt-5 bg-secondary rounded mx-4 p-3  shadow-lg">
      {error && <h3 className="text-dander">{error}</h3>}
      <div className="container">
        <h2 className="text-center">Exclusive Deals & Offers</h2>
        <div
          id="promotionCarousel"
          className="carousel slide"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            {randomProducts.map((product, index) => (
              <div
                className={`position-relative carousel-item ${
                  index === 0 ? "active" : ""
                }`}
                key={product._id}
                style={{ height: "70vh" }}
              >
                <img
                  src={product.thumbnail}
                  className="d-block mx-auto img-fluid"
                  alt={product.title}
                />
                <div className="carousel-caption d-md-block position-absolute bottom-0">
                  <h5 className="">{product.title}</h5>
                  <p className="d-none d-lg-block">{product.description}</p>
                  <a
                    href={`/product/${encodeURIComponent(product.id)}`}
                    className="btn btn-primary mt-2"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#promotionCarousel"
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
            data-bs-target="#promotionCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

    </section>
  );
};

export default PromotionalSection;
