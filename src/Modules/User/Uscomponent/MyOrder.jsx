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
import api from "../../../api";

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
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };
    if (!orders.length) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 2, sm: 4 },
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        sx={{ fontSize: { xs: "22px", sm: "32px" } }}
      >
        🧾 My Orders
      </Typography>

      {/* No orders */}
      {orders.length === 0 && (
        <Typography>No orders found</Typography>
      )}

      {/* Orders list */}
      {orders.map((order) => (
        <Card
          key={order._id}
          sx={{ mb: 3, p: { xs: 1.5, sm: 2 }, borderRadius: 3 }}
        >
          <Typography fontWeight="bold">
            Order ID: {order._id}
          </Typography>

          <Typography color="gray" mb={1}>
            Total Paid: ₹{order.total}
          </Typography>

          {/* Items inside order */}
          {order.items.map((item) => {
            // 🔥 Prevent crash if product deleted
            if (!item.deviceId) {
              return (
                <Typography key={item._id} color="error" mt={1}>
                  Product removed from store
                </Typography>
              );
            }

            return (
              <Card
                key={item.deviceId._id}
                onClick={() =>
                  navigate(`/orderdetails/${order._id}`, { state: { item } })
                }
                sx={{
                  display: { xs: "block", sm: "flex" },
                  alignItems: "center",
                  mt: 2,
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  image={
                    item.deviceId.device_image ||
                    "https://via.placeholder.com/200"
                  }
                  alt={item.deviceId.device_name}
                  sx={{
                    width: { xs: "100%", sm: 90 },
                    height: { xs: 160, sm: 90 },
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />

                {/* Details */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography fontWeight="bold">
                    {item.deviceId.device_name}
                  </Typography>
                  <Typography>
                    Price: ₹{item.deviceId.device_price}
                  </Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </CardContent>

                {/* Status */}
                <Stack alignItems="center" mr={2}>
                  <Chip
                    label={item.shippingStatus}
                    color={
                      item.shippingStatus === "Delivered"
                        ? "success"
                        : item.shippingStatus === "Shipping"
                        ? "warning"
                        : "error"
                    }
                  />
                </Stack>
              </Card>
            );
          })}
        </Card>
      ))}
    </Box>
  );
}