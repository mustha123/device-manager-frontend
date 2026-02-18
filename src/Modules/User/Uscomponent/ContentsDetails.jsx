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
        { headers: { Authorization: token } }
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
        padding: { xs: 2, md: 6 }, // 📱 Mobile view
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
          boxShadow: 4,
          padding: { xs: 1.5, sm: 2 }, // 📱 Mobile view
        }}
      >
        <CardMedia
          component="img"
        image={`${API_URL}/uploads/${product.device_image}`}          alt={product.device_name}
          sx={{
            height: { xs: 220, sm: 300 }, // 📱 Mobile view
            borderRadius: 2,
            objectFit: "cover", // 📱 Mobile view
          }}
        />

        <CardContent sx={{ padding: { xs: "12px 8px", sm: "16px" } }}> {/* 📱 Mobile view */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "18px", sm: "20px" } }} // 📱 Mobile view
          >
            {product.device_type}
          </Typography>

          <Typography
            variant="h5"
            color="success.main"
            sx={{
              marginY: 1,
              fontWeight: "bold",
              fontSize: { xs: "20px", sm: "24px" }, // 📱 Mobile view
            }}
          >
            ₹ {product.device_price}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "13px", sm: "14px" } }} // 📱 Mobile view
          >
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
            fontWeight: "bold",
            height: { xs: 48, sm: "auto" }, // 📱 Mobile view
            fontSize: { xs: "16px", sm: "14px" }, // 📱 Mobile view
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card>
    </Box>
  );
}
