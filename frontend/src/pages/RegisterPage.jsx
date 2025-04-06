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
  const { setLoginStatus } = useContext(CartContext);
  // console.log(formData);
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

    try {
      // Send POST request to your backend registration endpoint
      const response = await axios.post(
        "http://localhost:3000/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message); // Display success message
      console.log(response.data);
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

  return (
    <><div className="container mt-5 ">
  <div className="card border-light-subtle p-4 bg-transparent" >
    <div className=" row justify-content-center ">
      <div className="col-12 col-md-8 bg-light shadow-lg rounded col-lg-6">
        <div className="card-body ">
          <div className="my-4 text-center">
            <h3 className="mb-3 text-secondary">Registration</h3>
            { message && <div className="alert alert-info">{message}</div>}
          </div>
          <form
            onSubmit={handleSubmit}
            encType="application/x-www-form-urlencoded"
          >
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
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="password"
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
                <div className="d-grid ">
                  <button
                    className="btn btn-primary w-50 mx-auto" // Make button full width on all screens
                    type="submit"
                  >
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
     
    </>
  );
};

export default RegisterPage;
