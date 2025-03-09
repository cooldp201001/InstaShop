import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000000);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters(); // Apply filters whenever the search term changes
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setAllProducts(response.data);
      setFilteredProducts(response.data);
      extractTags(response.data);
      getAllCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false); 
    }
  };

  const extractTags = (products) => {
    const tags = new Set();
    products.forEach((product) => product.tags.forEach((tag) => tags.add(tag)));
    setAllTags([...tags]);
  };

  const getAllCategories = (products) => {
    const categories = new Set();
    products.forEach((product) => categories.add(product.category));
    setAllCategories([...categories]);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const applyFilters = () => {
    let filtered = allProducts.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price <= priceRange
    );
  
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredProducts(filtered);
  
    // Check if any filters are applied
    const filtersApplied = selectedCategories.length > 0 || priceRange < 1000 || searchTerm.trim() !== "";
    setIsFiltered(filtersApplied);
  };
  

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(1000000);
    setFilteredProducts(allProducts);
    setIsFiltered(false);
    setSearchTerm("");
  };

  if (loading) {
    return <div>Loading products...</div>; // Render loading indicator
}
  return (
    <div className="container-fluid text-white">
    <div className="row my-3"> {/* Add a row for the search box */}
        <div className="col-md-6 offset-md-3"> {/* Center the search box */}
            <div className="input-group"> {/* Wrap input in input-group */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="input-group-text">
                        <i class="fa-solid fa-magnifying-glass"></i> {/* Add search icon */}
                        </span>
                    </div>
        </div>
    </div>

      <div className="AllProducts d-flex flex-wrap justify-content-center gap-4">
        {filteredProducts.map((product, index) => (
          <div className="card" style={{ width: "15rem" }} key={index}>
            <a className="text-black text-decoration-none" href={`/product/${encodeURIComponent(product.id)}`}>
              <img className="card-img-top" src={product.thumbnail} alt={product.title} loading="lazy" />
              <div className="card-body pb-0">
                <h5 className="card-title">{product.title}</h5>
                <p className="text-muted">${product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <button
        className={`btn ${isFiltered ? "btn-warning" : "btn-primary"} floating-btn`}
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        {isFiltered ? "Filters Applied" : "Filter Products"}
      </button>

      <div className="modal fade" id="filterModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter Products</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-black">
              <h5>Select Categories</h5>
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
                    <label className="form-check-label" htmlFor={`category-${index}`}>
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
                max="1000000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <p>Up to: ${priceRange}</p>
            </div>

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
