import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [randomCategories, setRandomCategories] = useState([]);
const [loading,setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/random/categories");
      setRandomCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if(loading){
    return <>Loading Category..</>
  }
  return (
    <div>
      <h1 className="text-center mt-4">Categories</h1>
      {error && <p className="text-danger">{error}</p>}

      <div className="row w-100 justify-content-center">

        {randomCategories.map((category, index) => (
          <div className="col-md-3 p-0  mb-3" key={index}>
            <div className="card" style={{width:"20rem"}} >
                <img className="card-img-top" src= {category.image} alt=""  />
              <div className="card-body">
                <h5 className="card-title">{category.categoryName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = "/categories"} // Replace with actual navigation logic if using React Router
        >
          Explore More Categories
        </button>
      </div>
    </div>
  );
};

export default Categories;
