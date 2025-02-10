import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [isFiltered, setIsFiltered] = useState(false);

  // Fetching all products, tags, and categories
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setAllProducts(response.data);
      setFilteredProducts(response.data);
      extractTags(response.data);
      getAllCategories(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Extract tags from products
  const extractTags = (products) => {
    const tags = new Set();
    products.forEach((product) => product.tags.forEach((tag) => tags.add(tag)));
    setAllTags([...tags]);
  };

  // Extract categories from products
  const getAllCategories = (products) => {
    const categories = new Set();
    products.forEach((product) => categories.add(product.category));
    setAllCategories([...categories]);
    console.log(allCategories)
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = allProducts.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price <= priceRange
    );

    setFilteredProducts(filtered);
    setIsFiltered(true);
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(1000);
    setFilteredProducts(allProducts);
    setIsFiltered(false);
  };

  return (
    <div className="container-fluid text-white">
      {/* Product Grid */}
      <div className="AllProducts d-flex flex-wrap justify-content-center gap-4">
        {filteredProducts.map((product, index) => (
          <div className="card" style={{ width: "15rem" }} key={index}>
            <a className="text-black text-decoration-none  " href={`/product/${encodeURIComponent(product.id)}`}>
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

      {/* Floating Filter Button */}
      <button
        className={`btn ${isFiltered ? "btn-warning" : "btn-primary"} floating-btn`}
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        {isFiltered ? "Filters Applied" : "Filter Products"}
      </button>

      {/* Filter Modal */}
      <div className="modal fade" id="filterModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter Products</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-black">
              {/* Category Filter */}
              <h5>Select Categories</h5>
              <div className="d-flex flex-wrap gap-3">
                {allCategories.map((category, index) =>{
                  return (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`category-${index}`}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label className="form-check-label" htmlFor={`category-${index}`}>
                      {category}
                    </label>
                  </div>
                )})}
              </div>

              {/* Price Range Filter */}
              <h5 className="mt-3">Price Range</h5>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <p>Up to: ${priceRange}</p>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-danger" onClick={clearFilters} data-bs-dismiss="modal">
                Clear Filters
              </button>
              <button className="btn btn-primary" onClick={applyFilters} data-bs-dismiss="modal">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button CSS */}
      <style>{`
        .floating-btn {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 16px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
