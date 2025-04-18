import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message only
  const navigate = useNavigate();
  const location = useLocation();
  // Accessing the setLoginStatus function from the CartContext to update the user's login state
  const { setLoginStatus } = useContext(CartContext);

 // Function to handle changes in the input fields (email and password)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
// Asynchronous function to handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", formData, {
        withCredentials: true,
      });

      setFormData({ email: "", password: "" });

      const from = location.state?.from?.pathname || "/";
      navigate(from);
      setLoginStatus(true);
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setErrorMessage(message); // Only set the error message
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5 ">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-lg">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h4 className="text-center text-secondary mb-5">
                  Sign in to your account
                </h4>
                {location.state?.message && (
                  <div className="alert alert-warning">
                    {location.state.message}
                  </div>
                )}
                {errorMessage && ( // Only show the error message if it exists
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3 shadow-sm">
                        <input
                          type="email"
                          className="form-control "
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3 shadow-sm">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg "
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Don't have an account?{" "}
                        <a
                          href="/register"
                          className="link-primary text-decoration-none"
                        >
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
