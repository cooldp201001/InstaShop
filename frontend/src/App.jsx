
import { BrowserRouter,Routes ,Route} from "react-router-dom"
import {useState, useEffect} from 'react'
import axios from "axios"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import AboutUsPage from "./pages/AboutUsPage"
import ProfilePage from "./pages/ProfilePage"
import MyOrdersPage from "./pages/MyOrdersPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
function App() {

  const [cartItems, setCartItems] = useState([]);
  
   // Load cart items from localStorage on page load
  /* useEffect(() => {
    const storedCart = window.localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  */


  // Store cart items in localStorage whenever cartItems changes
  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  /* const handleAddToCart = (product) => {

    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, product]);
    }
    alert("Product added to cart!");
  };
  

*/


//Add product to cart (API call version)
const handleAddToCart = async (product) => {
  try {
    const token = localStorage.getItem("token"); // Get the user's token
    const response = await axios.post(
      "http://localhost:3000/cart",
      {
        productId: product._id, // Send product ID and quantity to the backend
        quantity: product.quantity|| 1, // Default quantity is 1 (you can adjust as needed)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      }
    );

    if (response.status === 200) {
      alert("Product added to cart!");

    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart.");
  }
};


  const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity), 0);

  return (
    <BrowserRouter>
      <Navbar cartItemCount={cartItemCount}/>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/product/:id" element = {<ProductDetailsPage handleAddToCart={handleAddToCart} />} />
        <Route path="/myOrders" element={<MyOrdersPage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
           
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
