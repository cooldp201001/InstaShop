import { BrowserRouter, Routes, Route } from "react-router-dom";
 import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OrderHistory from "./pages/OrderHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "../context/cartContext";
import ToastNotification from "./components/ToastNotification";
import { ToastProvider } from "../context/ToastContext";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
    return (
        <ToastProvider>
        <BrowserRouter>
            <CartProvider> 
                <Navbar />
                <Routes>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/product/:id" element={<ProtectedRoute  element={<ProductDetailsPage />} />}
                    />
                    <Route
                        path="/cart"
                        element={<ProtectedRoute element={<CartPage />} />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute element={<ProfilePage />} />}
                    />
                    <Route
                        path="/order"
                        element={<ProtectedRoute element={<OrderHistory />} />}
                    />

                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
             </CartProvider> 
             <ToastNotification/>
        </BrowserRouter>
        </ToastProvider>
    );
}

export default App;