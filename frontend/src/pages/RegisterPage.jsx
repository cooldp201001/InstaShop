import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/cartContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setLoginStatus } = useContext(CartContext);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
// Client-side password validation
if (formData.password.length < 8) {
  setMessage("Password must be at least 6 characters long.");
  return; // Stop the submission
}
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message); // Display success message
      // console.log(response.data);
      // Redirect to the home page after successful registration
      setLoginStatus(true);
      setTimeout(() => navigate("/"), 1500);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      // console.log(error)
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="container mt-5">
      <div className="card border-light-subtle shadow-lg p-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card-body">
              <div className="mb-4 text-center">
                <h3 className="mb-5 text-secondary">Registration</h3>
                {message && <div className="alert alert-info">{message}</div>}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="firstName">
                        First Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="lastName">
                        Last Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 position-relative">
                    <div className="form-floating">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="password">
                        Password <span className="text-danger">*</span>
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn  position-absolute top-50 end-0 translate-middle-y me-4"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`bi ${showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}`}></i>
                    </button>
                  </div> 
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="iAgree"
                        name="iAgree"
                        required
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="iAgree"
                      >
                        I agree to the{" "}
                        <a
                          href="#!"
                          className="link-primary text-decoration-none"
                        >
                          terms and conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn btn-primary w-100" type="submit">
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mb-4 border-secondary-subtle" />
                  <p className="m-0 text-secondary text-center">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="link-primary text-decoration-none"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
