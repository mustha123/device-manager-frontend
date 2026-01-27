import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
// import axios from "axios";
import api from '../../../api';
import { API_URL } from "../../../config";



export default function ContentsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <Typography variant="h5" align="center" mt={5}>
        Product Not Found!
      </Typography>
    );
  }

  const token = localStorage.getItem("UserToken");

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/api/cart/add",
        {
          productId: product._id,
          price: product.device_price
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Product added to cart!");
      navigate("/carts");
    } catch (error) {
      console.log(error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: { xs: 2, md: 6 }
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
          boxShadow: 4,
          padding: 2
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={`${API_URL}/uploads/${product.device_image}`}
          alt={product.device_name}
          sx={{ borderRadius: 2 }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {product.device_type}
          </Typography>

          <Typography
            variant="h5"
            color="success.main"
            sx={{ marginY: 1, fontWeight: "bold" }}
          >
            ₹ {product.device_price}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.device_info ||
              "Latest device with cutting-edge features and AI-powered performance."}
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{
            marginTop: 2,
            borderRadius: 2,
            fontWeight: "bold"
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card>
    </Box>
  );
}
