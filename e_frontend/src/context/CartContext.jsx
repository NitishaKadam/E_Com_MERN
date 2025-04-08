import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (user?._id) {
        try {
          const { data } = await axios.get(`/api/cart/${user._id}`);
          setCart(data.items || []);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      }
    };
    fetchCart();
  }, [user]);

  const saveCartToBackend = async (updatedCart) => {
    if (!user?._id) return;
    try {
      await axios.post("/api/cart/save", {
        userId: user._id,
        items: updatedCart.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
      });
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    saveCartToBackend(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    saveCartToBackend(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCartToBackend([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
