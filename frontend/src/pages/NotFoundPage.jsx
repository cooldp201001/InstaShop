
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3 text-dark">Oops! Page not found.</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-outline-primary btn-lg shadow-lg rounded">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
