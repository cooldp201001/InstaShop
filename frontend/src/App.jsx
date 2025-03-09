import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
    return (
        <BrowserRouter>
            <CartProvider> {/* Wrap your app with CartProvider */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
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
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;