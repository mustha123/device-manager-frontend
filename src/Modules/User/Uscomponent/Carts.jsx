import React, { useEffect, useState } from "react";
import api from '../../../api';
import { API_URL } from "../../../config";

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

export default function Carts() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    api
      .get("/api/cart/get", {
        headers: { Authorization: localStorage.getItem("UserToken") },
      })
      .then((res) => setCart(res.data.cart))
      .catch((err) => console.log("Fetch cart error:", err));
  };

  const updateQty = (productId, quantity) => {
    api
      .put(
        "/api/cart/update",
        { productId, quantity },
        { headers: { Authorization: localStorage.getItem("UserToken") } }
      )
      .then(() => fetchCart());
  };

  const deleteItem = (productId) => {
    api
      .delete(`/api/cart/delete/${productId}`, {
        headers: { Authorization: localStorage.getItem("UserToken") },
      })
      .then(() => fetchCart());
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };
    if (!cart) return <Typography sx={{ p: 3 }}>Loading...</Typography>;


  return (
    <Box sx={{ padding: "20px", paddingBottom: { xs: "20px", sm: "20px" } }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cart?.items?.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <Card
              key={item.productId._id}
              sx={{
                display: { xs: "block", sm: "flex" }, // mobile stack
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <CardMedia
                component="img"
                image={item.productId.device_image}
                alt={item.productId.device_name}
                sx={{
                  width: { xs: "100%", sm: 100 },
                  height: { xs: 180, sm: 100 },
                  borderRadius: 2,
                  objectFit: "cover",
                  marginBottom: { xs: 1, sm: 0 },
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  padding: { xs: "8px 0", sm: "0 16px" },
                }}
              >
                <Typography variant="h6" noWrap>
                  {item.productId.device_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Unit Price: ₹{item.price}
                </Typography>

                <Typography variant="body1" fontWeight="bold" color="green">
                  Subtotal: ₹{item.quantity * item.price}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mt={1}
                  justifyContent={{ xs: "space-between", sm: "flex-start" }}
                >
                  <IconButton
                    size="large"
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography>{item.quantity}</Typography>

                  <IconButton
                    size="large"
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton
                    size="large"
                    color="error"
                    onClick={() => deleteItem(item.productId._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}

          <Box
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #ccc",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₹{cart?.totalPrice || 0}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "15px", background: "#ef1027ff" }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="gray">
          Your cart is empty 🛍️
        </Typography>
      )}
    </Box>
  );
}
