
import { BrowserRouter,Routes ,Route} from "react-router-dom"
import {useState, useEffect} from 'react'
import axios from "axios"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import ProfilePage from "./pages/ProfilePage"
import MyOrdersPage from "./pages/MyOrdersPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
function App() {


  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/product/:id" element = {<ProductDetailsPage />} />
        <Route path="/myOrders" element={<MyOrdersPage />} />
        <Route
          path="/cart"
          element={
            <CartPage
             
          
            />
          }
        />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
  <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
