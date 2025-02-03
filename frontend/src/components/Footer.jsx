import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>InstaShop</h5>
            <p>Your one-stop shop for the best deals.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/faq" className="text-white">FAQ</a></li>
              <li><a href="/blog" className="text-white">Blog</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/shipping" className="text-white">Shipping Policy</a></li>
              <li><a href="/returns" className="text-white">Returns & Refunds</a></li>
              <li><a href="/terms" className="text-white">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-white me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} InstaShop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
