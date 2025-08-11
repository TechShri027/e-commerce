
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

 
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

 
  const clearCart = () => setCart([]);


  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrders((prev) => [...prev, { id: Date.now(), items: cart }]);
    clearCart();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
