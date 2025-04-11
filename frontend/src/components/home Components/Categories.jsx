import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [randomCategories, setRandomCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoading, setImageLoading] = useState({}); // Track loading state for each image

  // image loader function
  const handleImageLoad = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false })); // Mark image as loaded
  };

  // Fetching random categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/random/categories"
        );
        setRandomCategories(response.data);

        // Initialize image loading state
        const initialLoadingState = response.data.reduce((acc, _, index) => {
          acc[index] = true; // Images start in the loading state
          return acc;
        }, {});
        setImageLoading(initialLoadingState);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
    <div>
      <h1 className="text-center mt-4 mb-3">Categories</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className="container">
        <div className="row justify-content-center">
          {randomCategories.map((category, index) => (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <Link
                className="text-decoration-none"
                to="/product"
                state={{ selectedCategory: category.categoryName }}
              >
                <div className="card h-100 productCard">
                  {imageLoading[index] && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "200px" }}
                    >
                      <div
                        className="spinner-border text-secondary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  <img
                    className="card-img-top"
                    src={category.image}
                    alt={category.categoryName}
                    onLoad={() => handleImageLoad(index)}
                    style={{ display: imageLoading[index] ? "none" : "block" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{category.categoryName}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-3">
        <Link to="/product" state={{ openFilter: true }}>
          <button className="btn btn-primary">Explore More Categories</button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
