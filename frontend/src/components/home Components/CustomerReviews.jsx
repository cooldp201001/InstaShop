import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  ///function to get random reviews
  const getReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/random/reviews');
      const data = response.data;
      setReviews(data);
    } catch (error) {
         console.log(error)
    }
  }
  //get reviews from database
  useEffect(()=>{
    getReviews();
  },[])
  return (
    <section className="customer-reviews py-5">
      <div className="container">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <div className="row">
      
        {reviews.flatMap(product => product.reviews).map((review, index) => (
  <div className="col-md-4 mb-4" key={index}>
    <div className="card h-100 shadow-sm p-0">
      <div className="card-body">
        <h5 className="card-title">{review.reviewerName}</h5>
        <p className="text-warning">
          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
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
    </section>
  );
};

export default CustomerReviews;
