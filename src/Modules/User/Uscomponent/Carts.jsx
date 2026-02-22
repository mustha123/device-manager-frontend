import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

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
    if (quantity < 1) return;

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

  // 🔥 Loading state
  if (!cart) {
    return (
      <Typography sx={{ p: 3, textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Your Cart
      </Typography>

      {/* 🔥 Empty cart */}
      {cart?.items?.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {/* 🔥 Cart items */}
          {cart?.items?.map((item) => {
            // Prevent crash if product deleted in DB
            if (!item?.productId) {
              return (
                <Typography key={item._id} color="error" sx={{ mt: 2 }}>
                  Product removed from store
                </Typography>
              );
            }

            return (
              <Card
                key={item.productId._id}
                sx={{
                  display: { xs: "block", sm: "flex" },
                  alignItems: "center",
                  margin: "10px 0",
                  padding: "10px",
                }}
              >
                {/* IMAGE */}
                <CardMedia
                  component="img"
                  image={
                    item.productId?.device_image ||
                    "https://via.placeholder.com/200"
                  }
                  alt={item.productId?.device_name}
                  sx={{
                    width: { xs: "100%", sm: 100 },
                    height: { xs: 180, sm: 100 },
                    borderRadius: 2,
                    objectFit: "cover",
                    marginBottom: { xs: 1, sm: 0 },
                  }}
                />

                {/* DETAILS */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    padding: { xs: "8px 0", sm: "0 16px" },
                  }}
                >
                  <Typography variant="h6" noWrap>
                    {item.productId?.device_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Unit Price: ₹{item.price}
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="green"
                  >
                    Subtotal: ₹{item.quantity * item.price}
                  </Typography>

                  {/* QUANTITY */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    mt={1}
                  >
                    <IconButton
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteItem(item.productId._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}

          {/* 🔥 Total */}
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #ccc",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₹{cart?.totalPrice || 0}
            </Typography>
          </Box>

          {/* 🔥 Checkout */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, background: "#ef1027" }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
}