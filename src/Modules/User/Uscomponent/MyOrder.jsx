import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack
} from "@mui/material";
import api from '../../../api';
import { API_URL } from "../../../config";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/order/myorders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 2, sm: 4 }, // 📱 Mobile view
        px: 2 // 📱 Mobile view
      }}
    >
      <Typography variant="h4" mb={3} sx={{ fontSize: { xs: "22px", sm: "32px" } }}> {/* 📱 Mobile view */}
        🧾 My Orders
      </Typography>

      {orders.length === 0 && (
        <Typography>No orders found</Typography>
      )}

      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 3, p: { xs: 1.5, sm: 2 }, borderRadius: 3 }}> {/* 📱 Mobile view */}
          <Typography fontWeight="bold" sx={{ fontSize: { xs: "14px", sm: "16px" } }}> {/* 📱 Mobile view */}
            Order ID: {order._id}
          </Typography>

          <Typography color="gray" mb={1}>
            Total Paid: ₹{order.total}
          </Typography>

          {order.items.map((item) => (
            <Card
              key={item.deviceId._id}
              onClick={() =>
                navigate(`/orderdetails/${order._id}`, { state: { item } })
              }
              sx={{
                display: { xs: "block", sm: "flex" }, // 📱 Mobile view
                alignItems: "center",
                mt: 2,
                p: 1,
                cursor: "pointer",
                borderRadius: 2
              }}
            >
              <CardMedia
                component="img"
               image={item.deviceId.device_image}
                alt={item.deviceId.device_name}
                sx={{
                  width: { xs: "100%", sm: 90 }, // 📱 Mobile view
                  height: { xs: 160, sm: 90 }, // 📱 Mobile view
                  borderRadius: 2,
                  objectFit: "cover",
                  mb: { xs: 1, sm: 0 } // 📱 Mobile view
                }}
              />

              <CardContent sx={{ flex: 1, p: { xs: "8px 0", sm: "8px 16px" } }}> {/* 📱 Mobile view */}
                <Typography fontWeight="bold">
                  {item.deviceId.device_name}
                </Typography>
                <Typography>Price: ₹{item.deviceId.device_price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </CardContent>

              <Stack alignItems="center" mr={{ xs: 0, sm: 2 }}> {/* 📱 Mobile view */}
                <Chip
                  label={item.shippingStatus}
                  color={
                    item.shippingStatus === "Delivered"
                      ? "success"
                      : item.shippingStatus === "Shipping"
                      ? "warning"
                      : "error"
                  }
                  sx={{ mt: { xs: 1, sm: 0 } }} // 📱 Mobile view
                />
              </Stack>
            </Card>
          ))}
        </Card>
      ))}
    </Box>
  );
}
