import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { setLoginStatus } = useContext(CartContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/login', formData, {
                withCredentials: true,
            });

            setMessage('Login successful!');
            setFormData({ email: '', password: '' });

            const from = location.state?.from?.pathname || '/';
            navigate(from);
            setLoginStatus(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            setMessage(errorMessage);
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <section className="bg-light py-3 py-md-5 bg-black">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <h2 className="text-center text-secondary mb-5">
                                        Sign in to your account
                                    </h2>
                                    {location.state?.message && (
                                        <div className="alert alert-warning">
                                            {location.state.message}
                                        </div>
                                    )}
                                    {message && <div className="alert alert-info">{message}</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
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
                                                <div className="form-floating mb-3">
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
                                                    <button className="btn btn-primary btn-lg" type="submit">
                                                        Log in
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <p className="m-0 text-secondary text-center">
                                                    Don't have an account?{' '}
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
            </section>
        </>
    );
};

export default LoginPage;