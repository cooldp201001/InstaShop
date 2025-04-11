import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { state } = location;
  const selectedCategory = state?.selectedCategory; // Access selected category
  const modalButtonRef = useRef(null);

  // Fetching product details from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        // throw new Error("Error fetching products");
        setAllProducts(response.data);
        setFilteredProducts(response.data);
        getAllCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // for the filter functionality
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategories, priceRange]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
      setIsFiltered(true);
      applyFilters();
    }
    if (state && state.openFilter) {
      setTimeout(() => {
        console.log("Attempting to find floating button");
        const filterButton = document.querySelector(".floating-btn");

        if (filterButton) {
          filterButton.click();
        } else {
          console.error("Filter button not found.");
        }
      }, 1000);
    }
  }, [state, selectedCategory]);

  //  Getting all types of the Categories
  const getAllCategories = (products) => {
    const categories = new Set();
    products.forEach((product) => categories.add(product.category));
    setAllCategories([...categories]);
  };

  // Filtering the products based on the selected categories
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // appling filters to the products
  const applyFilters = () => {
    let filtered = allProducts.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.price <= priceRange
    );

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    const filtersApplied =
      selectedCategories.length > 0 ||
      priceRange < 100000 ||
      searchTerm.trim() !== "";
    setIsFiltered(filtersApplied);
  };

  // clearing the filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(100000);
    setFilteredProducts(allProducts);
    setIsFiltered(false);
    setSearchTerm("");
  };

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
        className="alert alert-danger text-center fs-4 m-5 shadow-lg rounded"
        role="alert"
      >
        <i className="fa-solid fa-circle-exclamation"></i> Error in fatching the
        products
      </div>
    );
  }

  return (
    <div className="container-fluid text-white">
      <div className="row my-3">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="AllProducts d-flex flex-wrap justify-content-center gap-4">
        {filteredProducts.map((product, index) => (
          <div
            className="card productCard"
            style={{ width: "15rem" }}
            key={product.id}
          >
            <a
              className="text-black text-decoration-none"
              href={`/product/${encodeURIComponent(product.id)}`}
            >
              <img
                className="card-img-top"
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
              />
              <div className="card-body pb-0">
                <h5 className="card-title">{product.title}</h5>
                <p className="text-muted">${product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <button
        ref={modalButtonRef}
        className={`btn ${
          isFiltered ? "btn-warning" : "btn-primary"
        } floating-btn`}
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        {isFiltered ? "Filters Applied" : "Filter Products"}
      </button>
      

      <div className="modal fade shadow-lg rounded" id="filterModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
           
              <h5 className="modal-title text-black ">Select Categories</h5>
            
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-black">
              {/* <h5>/h5> */}
              <div className="d-flex flex-wrap gap-3">
                {allCategories.map((category, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`category-${index}`}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`category-${index}`}
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <h5 className="mt-3">Price Range</h5>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <p>Up to: ${priceRange}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-danger"
                onClick={clearFilters}
                data-bs-dismiss="modal"
              >
                Clear Filters
              </button>
              <button
                className="btn btn-primary"
                onClick={applyFilters}
                data-bs-dismiss="modal"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ProductPage;
