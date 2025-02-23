import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when the app loads
  // Fetch cart items when the component loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        // setLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  // Get total count of items in the cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
