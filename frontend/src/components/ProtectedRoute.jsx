import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import axios from 'axios';

const ProtectedRoute = ({ element, ...rest }) => {
    const { loginStatus, setLoginStatus } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Use an existing protected endpoint (e.g., /user/profile)
                await axios.get('http://localhost:3000/user/profile', { withCredentials: true });
                setIsAuthenticated(true);
                setLoginStatus(true);
            } catch (error) {
                setIsAuthenticated(false);
                setLoginStatus(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [setLoginStatus]);

    if (isLoading) {
        // You can replace this with a better loading indicator
        return <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status" style={{width: "4rem", height: "4rem"}} >
        </div>
      </div> ;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location, message: "Please log in to access this resource." }}
            />
        );
    }

    return element;
};

export default ProtectedRoute;