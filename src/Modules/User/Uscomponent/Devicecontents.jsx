import React,{useEffect,useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from '../../../api';
import { API_URL } from "../../../config";


export default function Devicecontents() {
  const navigate = useNavigate();
  const [products,setproducts]=useState([]);

  useEffect(()=>{
    fetchusers();
  },[]);

  const fetchusers = async () => {
  try {
    const response = await api.get('/api/device/getdevice');
    setproducts(response.data.getproducts);
  } catch (error) {
    console.log(error);
  }
};

  // 📌 Add To Cart Handler
  const handleAddToCart = (prod) => {
    // Store selected product data in localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(prod);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Navigate to cart page
    navigate("/carts", { state: { cartItems } });
  };

  return (
    <div style={{ padding: "55px" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap:"wrap",
          padding: "20px",
        }}
      >
        {products.map((prod) => (
         <Card
      sx={{ maxWidth: 345, cursor: "pointer" }}
      key={prod._id}
onClick={() => navigate(`/contentsdetails/${prod._id}`, { state: prod })}
>

            <CardMedia
  sx={{ height: 140 }}
  image={`${API_URL}/uploads/${prod.device_image}`}
  title={prod.device_name}
/>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {prod.device_type}<br/>
                ₹ {prod.device_price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAddToCart(prod)}>
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
