import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../../api';
import { API_URL } from "../../../config";

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
      const res = await api.get(`/api/order/orderdetails/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      });
      setOrder(res.data.order);
    } catch (error) {
      console.error("Order Details Error:", error);
    }
  };

  if (!order) return null;

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 2, sm: 4 }, // 📱 Mobile view
        px: 2 // 📱 Mobile view
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{ fontSize: { xs: "22px", sm: "32px" } }} // 📱 Mobile view
      >
        📦 Order Details
      </Typography>

      <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}> {/* 📱 Mobile view */}
        <Typography color="gray" mb={2} sx={{ fontSize: { xs: "13px", sm: "14px" } }}> {/* 📱 Mobile view */}
          Order ID: {order._id}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {order.items.map((item) => (
          <Card
            key={item.deviceId._id}
            sx={{
              display: { xs: "block", sm: "flex" }, // 📱 Mobile view
              mb: 3,
              p: { xs: 1.5, sm: 2 }, // 📱 Mobile view
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <CardMedia
              component="img"
              image={item.deviceId.device_image}
              alt={item.deviceId.device_name}
              sx={{
                width: { xs: "100%", sm: 120 }, // 📱 Mobile view
                height: { xs: 180, sm: 120 }, // 📱 Mobile view
                borderRadius: 2,
                objectFit: "cover",
                mr: { xs: 0, sm: 2 }, // 📱 Mobile view
                mb: { xs: 1, sm: 0 } // 📱 Mobile view
              }}
            />

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
                  sx={{ mt: { xs: 1, sm: 0 } }} // 📱 Mobile view
                />
              </Stack>
            </Box>
          </Card>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          align="right"
          sx={{ fontSize: { xs: "16px", sm: "18px" } }} // 📱 Mobile view
        >
          💰 Total Paid: <strong>₹{order.total}</strong>
        </Typography>
      </Card>
    </Box>
  );
}
