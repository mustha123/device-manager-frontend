import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";


export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Convert props → local state so we can modify it
  const [order, setOrder] = useState(state);
    const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  if (!order) return <Typography>No Order Found</Typography>;




  // ---------------------------------------------------
  // ❌ Cancel single product and update total
  // ---------------------------------------------------
 const handleCancelItem = async (deviceId) => {
  const token = localStorage.getItem("UserToken");

  if (!token) {
    alert("Please login again");
    navigate("/login");
    return;
  }

  await axios.put(
    `http://localhost:5000/api/order/cancel-item/${order._id}/${deviceId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const updatedItems = order.items.filter(
    item => item.deviceId._id !== deviceId
  );

  setOrder({
    ...order,
    items: updatedItems
  });
};



  return (
    <Card sx={{ maxWidth: 550, margin: "20px auto", padding: "20px", textAlign: "center" }}>
      <CardContent>
        <Typography variant="h4" color="green" fontWeight="bold">
          🎉 Order Successful!
        </Typography>

        <Typography variant="h6" mt={2}>
          Thank you for your purchase!
        </Typography>

        {/* Customer Info */}
        <Box mt={3} textAlign="left">
          <Typography variant="h6">Customer Details:</Typography>
          <Typography>Name: {order.customer.fullName}</Typography>
          <Typography>Mobile: {order.customer.mobile}</Typography>
          <Typography>Address: {order.customer.address}</Typography>
        </Box>

        {/* Order Items */}
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
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      border: "1px solid #ccc",
      padding: "8px",
      borderRadius: "8px",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={`http://localhost:5000/uploads/${item.deviceId.device_image}`}
        alt={item.deviceId.device_name}
        style={{
          width: "60px",
          height: "60px",
          marginRight: "12px",
          borderRadius: "8px",
        }}
      />

      <Box>
        <Typography fontWeight="bold">
          {item.deviceId.device_name}
        </Typography>
        <Typography>Qty: {item.quantity}</Typography>
        <Typography>
          Price: ₹{item.deviceId.device_price}
        </Typography>
      </Box>
    </Box>

   <Button
  variant="outlined"
  color="error"
  disabled={item.shippingStatus !== "Pending"}
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

        {/* Total Price */}
        <Typography variant="h6" mt={2}>
          Total Paid: ₹{order.total}
        </Typography>

        {/* Action Buttons Row */}
        <Box display="flex" justifyContent="space-between" ml={22} mt={3}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "48%" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>

          {/* <Button
            variant="contained"
            color="error"
            sx={{ width: "48%" }}
            onClick={() => navigate("/")}
          >
            Cancel Order
          </Button> */}
        </Box>
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
  <DialogTitle>Cancel Item</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to cancel this item?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)}>
      No
    </Button>
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
