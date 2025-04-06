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
    <div className="container py-5">
    <h2 className="text-center mb-4">What Our Customers Say</h2>
    <div className="row">
      {reviews.flatMap((product) => product.reviews).map((review, index) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
          <div className="card customerReviewCard h-100 shadow-lg">
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
    <style>{
      `.customerReviewCard {
  border: none; /* Removes the border */
/* Keeps a clean white background */
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  overflow: hidden; /* Prevents content from overflowing */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adds hover effect */
}

.customerReviewCard:hover {
  transform: scale(1.08); /* Slight lift on hover */
}

.card-body {
  padding: 20px; /* Adds inner spacing for content */
  text-align: center; /* Centers text within the card */
}

.text-warning {
  font-size: 1.25rem; /* Makes stars larger for better visibility */
}
`
      }

    </style>
  </div>
  
  );
};

export default CustomerReviews;
