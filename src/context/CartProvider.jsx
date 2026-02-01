import { useEffect, useState } from "react";
// import axios from "axios";
import api from '../api';

import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const token = localStorage.getItem("UserToken");

  const fetchCart = () => {
    return api
      .get("/api/cart/get", {
        headers: { Authorization: token },
      })
      .then((res) => setCart(res.data.cart))
      .catch((err) => console.log(err));
  };

  const updateQty = (productId, quantity) => {
    return api
      .put(
        "/api/cart/update",
        { productId, quantity },
        { headers: { Authorization: token } }
      )
      .then(fetchCart);
  };

  const deleteItem = (productId) => {
    return api
      .delete(
        `/api/cart/delete/${productId}`,
        { headers: { Authorization: token } }
      )
      .then(fetchCart);
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, updateQty, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
