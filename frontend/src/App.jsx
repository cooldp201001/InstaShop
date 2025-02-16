
import { BrowserRouter,Routes ,Route} from "react-router-dom"
import {useState, useEffect} from 'react'
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import AboutUsPage from "./pages/AboutUsPage"
import ProfilePage from "./pages/ProfilePage"
import MyOrdersPage from "./pages/MyOrdersPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
function App() {

  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
   // Load cart items from localStorage on page load
   useEffect(() => {
    const storedCart = window.localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Store cart items in localStorage whenever cartItems changes
  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const handleAddToCart = (product) => {
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

  // Remove product from cart
  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update product quantity in the cart
  const handleUpdateQuantity = (id, newQuantity) => {
    console.log(cartItemCount);
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
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
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          }
        />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
