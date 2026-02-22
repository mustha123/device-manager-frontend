import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import api from '../../../api';
import { API_URL } from "../../../config";

export default function Devicecontents() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await api.get('/api/device/getdevice');
      setproducts(response.data.getproducts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (prod) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(prod);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/carts", { state: { cartItems } });
  };
    if (!products.length) return <Typography sx={{ p: 3 }}>Loading...</Typography>;


  return (
    <div style={{ padding: "55px" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          padding: "20px",
          justifyContent: "center", // 📱 Mobile view
        }}
      >
        {products?.length > 0 && products.map((prod) => (
          <Card
            key={prod._id}
            onClick={() => navigate(`/contentsdetails/${prod._id}`, { state: prod })}
            sx={{
              maxWidth: { xs: "100%", sm: 345 }, // 📱 Mobile view
              width: "100%", // 📱 Mobile view
              cursor: "pointer",
              borderRadius: 3, // 📱 Mobile view
              boxShadow: { xs: 2, sm: 3 }, // 📱 Mobile view
            }}
          >
           <CardMedia
  component="img"
  image={prod.device_image}
  alt={prod.device_name}
              sx={{
                height: { xs: 180, sm: 140 }, // 📱 Mobile view
                objectFit: "cover", // 📱 Mobile view
              }}
            />

            <CardContent sx={{ padding: { xs: "12px", sm: "16px" } }}> {/* 📱 Mobile view */}
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontSize: { xs: "18px", sm: "20px" }, // 📱 Mobile view
                  fontWeight: 600, // 📱 Mobile view
                }}
              >
                {prod.device_type}
                <br />
                ₹ {prod.device_price}
              </Typography>
            </CardContent>

            <CardActions sx={{ padding: { xs: "0 12px 12px", sm: "8px" } }}> {/* 📱 Mobile view */}
              <Button
                size="small"
                sx={{ fontSize: { xs: "14px", sm: "13px" } }} // 📱 Mobile view
                onClick={(e) => {
                  e.stopPropagation(); // 📱 Mobile view (prevents card click)
                  handleAddToCart(prod);
                }}
              >
                Add to Cart
              </Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
