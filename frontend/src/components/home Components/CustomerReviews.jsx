import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch random reviews from API
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/random/reviews"
        );
        const data = response.data;
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <div className="row">
        {reviews
          .flatMap((product) => product.reviews)
          .map((review, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card customerReviewCard h-100 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">{review.reviewerName}</h5>
                  <p className="text-warning">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                  <p className="card-text">"{review.comment}"</p>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
};

export default CustomerReviews;
