import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
    const [randomCategories, setRandomCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading) {
        return <>Loading Category..</>;
    }
    return (
        <div>
            <h1 className="text-center mt-4 mb-3">Categories</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="container">
                <div className="row justify-content-center">
                    {randomCategories.map((category, index) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <Link  className="text-decoration-none" to="/product" state={{ selectedCategory: category.categoryName }}>
                                <div className="card h-100 productCard">
                                    <img className="card-img-top" src={category.image} alt={category.categoryName} />
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
