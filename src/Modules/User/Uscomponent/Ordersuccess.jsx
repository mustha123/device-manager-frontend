import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useState } from "react";
import api from '../../../api';

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(state);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  if (!order) return <Typography>No Order Found</Typography>;

  const handleCancelItem = async (deviceId) => {
    const token = localStorage.getItem("UserToken");
    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    await api.put(
      `/api/order/cancel-item/${order._id}/${deviceId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedItems = order.items.filter(
      item => item.deviceId._id !== deviceId
    );

    setOrder({ ...order, items: updatedItems });
  };

  return (
    <Card
      sx={{
        maxWidth: 550,
        margin: "20px auto",
        padding: { xs: "15px", sm: "20px" },
        textAlign: "center",
        borderRadius: 3
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          color="green"
          fontWeight="bold"
          sx={{ fontSize: { xs: "22px", sm: "32px" } }}
        >
          🎉 Order Successful!
        </Typography>

        <Typography variant="h6" mt={2}>
          Thank you for your purchase!
        </Typography>

        <Box mt={3} textAlign="left">
          <Typography variant="h6">Customer Details:</Typography>
          <Typography>Name: {order.customer.fullName}</Typography>
          <Typography>Mobile: {order.customer.mobile}</Typography>
          <Typography>Address: {order.customer.address}</Typography>
        </Box>

        {/* Items */}
        <Box mt={3} textAlign="left">
          <Typography variant="h6">Ordered Items:</Typography>

          {order.items.length === 0 && (
            <Typography color="red" mt={2}>
              All items cancelled. No products left.
            </Typography>
          )}

          {order.items.map((item) => (
            <Box
              key={item.deviceId._id}
              sx={{
                display: { xs: "block", sm: "flex" },
                alignItems: "center",
                mt: 2,
                border: "1px solid #ccc",
                p: 1.5,
                borderRadius: 2,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* ✅ FIXED IMAGE */}
                <img
                  src={item.deviceId.device_image}
                  alt={item.deviceId.device_name}
                  style={{
                    width: 60,
                    height: 60,
                    marginRight: 12,
                    borderRadius: 8,
                    objectFit: "cover"
                  }}
                />

                <Box>
                  <Typography fontWeight="bold">
                    {item.deviceId.device_name}
                  </Typography>
                  <Typography>Qty: {item.quantity}</Typography>
                  <Typography>Price: ₹{item.deviceId.device_price}</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="error"
                disabled={item.shippingStatus !== "Pending"}
                sx={{ mt: { xs: 1, sm: 0 } }}
                onClick={() => {
                  setSelectedDeviceId(item.deviceId._id);
                  setConfirmOpen(true);
                }}
              >
                Cancel order
              </Button>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" mt={2}>
          Total Paid: ₹{order.total}
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mt={3}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>

        {/* Dialog */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Cancel Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>No</Button>
            <Button
              color="error"
              onClick={async () => {
                await handleCancelItem(selectedDeviceId);
                setConfirmOpen(false);
              }}
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </CardContent>
    </Card>
  );
}