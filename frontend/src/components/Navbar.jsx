import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
const Navbar = () => {
  const { cartCount, loginStatus } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo/instashop-logo.png"
            style={{ width: "10rem", height: "2rem" }}
            alt="Insta Shop"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>

            {loginStatus ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                    <span className="badge bg-primary ms-2">{cartCount}</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/order">
                    Orders
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-bg-success rounded" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
