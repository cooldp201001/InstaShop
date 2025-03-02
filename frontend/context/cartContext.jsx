// CartContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {// Fetch cart items when the component loads 
    
    const fetchCart = async () => {
     try {
       const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      
       const response = await axios.get("http://localhost:3000/cart", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       const items = response.data;
       setCartItems(items);
       setCartCount(items.length);
      //  console.log(items.length);
       
      } catch (error) {
        console.error("Error fetching cart:", error);
        // setLoading(false);
        if(error.status ==403){
          localStorage.removeItem("token");
          return
        }
      }
    };
    fetchCart();
  }, []);
  

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item._id === product._id);
  
      if (itemExists) {
        return prevItems.map((item) => 
          item._id === product._id 
            ? { ...item, quantity:product.quantity } 
            : item
        );
      } else {
        setCartCount((prevCount)=> prevCount +1);
        return [...prevItems, product];
      }
    });
  
  };
  
  
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    setCartCount((prevCount) => prevCount - 1);
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartCount, setCartCount, addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
