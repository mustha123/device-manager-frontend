import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Select,
  MenuItem,
  Chip,
  Stack
} from "@mui/material";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/order/myorders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
      if (err.response) {
    console.error("STATUS:", err.response.status);
    console.error("DATA:", err.response.data);
  } else {
    console.error("ERROR MESSAGE:", err.message);
  }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        🧾 My Orders
      </Typography>

      {orders.length === 0 && (
        <Typography>No orders found</Typography>
      )}

      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 3, p: 2 }}>
          <Typography fontWeight="bold">
            Order ID: {order._id}
          </Typography>

          <Typography color="gray" mb={1}>
            Total Paid: ₹{order.total}
          </Typography>

          {/* ORDER ITEMS */}
          {order.items.map((item) => (
            <Card
              key={item.deviceId._id}
onClick={() =>
  navigate(`/orderdetails/${order._id}`, {
    state: { item }

  })
}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                p: 1,
              }}
            >
              {/* PRODUCT IMAGE */}
              <CardMedia
                component="img"
                image={`http://localhost:5000/uploads/${item.deviceId.device_image}`}
                alt={item.deviceId.device_name}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />

              {/* PRODUCT INFO */}
              <CardContent sx={{ flex: 1 }}>
                <Typography fontWeight="bold">
                  {item.deviceId.device_name}
                </Typography>

                <Typography>
                  Price: ₹{item.deviceId.device_price}
                </Typography>

                <Typography>
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>

              {/* SHIPPING STATUS */}
              <Stack alignItems="center" mr={2}>
                <Chip
  label={item.shippingStatus}
  color={
    item.shippingStatus === "Delivered"
      ? "success"
      : item.shippingStatus === "Shipping"
      ? "warning"
      : "error"   // Pending
  }
/>
              </Stack>
            </Card>
          ))}
        </Card>
      ))}
    </Box>
  );
}
