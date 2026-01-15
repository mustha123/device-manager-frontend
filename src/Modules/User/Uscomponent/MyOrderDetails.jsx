import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Box,
  CardMedia,
  Divider,
  Chip,
  Stack
} from "@mui/material";

export default function MyOrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/order/orderdetails/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );
      setOrder(res.data.order);
    } catch (error) {
      console.error("Order Details Error:", error);
    }
  };

  if (!order) return null;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📦 Order Details
      </Typography>

      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography color="gray" mb={2}>
          Order ID: {order._id}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {order.items.map((item) => (
          <Card
            key={item.deviceId._id}
            sx={{
              display: "flex",
              mb: 3,
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            {/* PRODUCT IMAGE */}
            <CardMedia
              component="img"
              image={`http://localhost:5000/uploads/${item.deviceId.device_image}`}
              alt={item.deviceId.device_name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
                objectFit: "cover",
                mr: 2,
              }}
            />

            {/* PRODUCT DETAILS */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {item.deviceId.device_name}
              </Typography>

              <Typography color="text.secondary">
                Price: ₹{item.deviceId.device_price}
              </Typography>

              <Typography>
                Quantity: {item.quantity}
              </Typography>

              <Stack direction="row" alignItems="center" mt={1}>
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
            </Box>
          </Card>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" align="right">
          💰 Total Paid: <strong>₹{order.total}</strong>
        </Typography>
      </Card>
    </Box>
  );
}
