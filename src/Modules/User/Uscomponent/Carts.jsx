import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom"; // ⬅ Add this
import CartContext from "../../../context/CartContext";

export default function Carts() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate(); // ⬅ Add this

  // const token = localStorage.getItem("UserToken");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
  axios
    .get("http://localhost:5000/api/cart/get", {
      headers: {
Authorization: localStorage.getItem("UserToken")
      },
    })
    .then((res) => setCart(res.data.cart))
    .catch((err) => console.log("Fetch cart error:", err));
};

  const updateQty = (productId, quantity) => {
    axios
      .put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity },
        {
         headers: {
Authorization: localStorage.getItem("UserToken")
}

        }
      )
      .then(() => fetchCart());
  };

  const deleteItem = (productId) => {
    axios
      .delete(`http://localhost:5000/api/cart/delete/${productId}`, {
       headers: {
Authorization: localStorage.getItem("UserToken")
}

      })
      .then(() => fetchCart());
  };

  const handleCheckout = () => {
  navigate("/checkout", { state: { cart } });
};


  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cart?.items?.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <Card
              key={item.productId._id}
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, borderRadius: 2 }}
                image={`http://localhost:5000/uploads/${item.productId.device_image}`}
                alt={item.productId.device_name}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {item.productId.device_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
  Unit Price: ₹{item.price}
</Typography>

<Typography variant="body1" fontWeight="bold" color="green">
  Subtotal: ₹{item.quantity * item.price}
</Typography>


                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
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
          ))}

          {/* TOTAL PRICE */}
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
              ₹{cart.totalPrice}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "15px", background: "#ef1027ff" }}
            onClick={handleCheckout}   // ⬅ Added Here
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
