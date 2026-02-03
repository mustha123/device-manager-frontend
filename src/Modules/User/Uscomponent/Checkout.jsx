import { useLocation, useNavigate } from "react-router-dom";
import api from '../../../api';
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box
} from "@mui/material";

export default function Checkout() {
  const { state } = useLocation();
  const cart = state?.cart;
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    fullName: "",
    mobile: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!details.fullName || !details.mobile || !details.address) {
      alert("Please fill all details");
      return;
    }

    try {
      const res = await api.post(
        "/api/order/create",
        {
          customer: {
            fullName: details.fullName,
            mobile: details.mobile,
            address: details.address,
          },
          items: cart.items,
          total: cart.totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );

      navigate("/ordersuccess", { state: res.data.order });
    } catch (error) {
      console.error("Order error:", error.response?.data);
      alert("Order failed");
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    alert("Cart is empty");
    return null;
  }

  return (
    <Card
      sx={{
        maxWidth: 550,
        margin: "20px auto",
        padding: { xs: "15px", sm: "20px" }, // 📱 Mobile view
        borderRadius: 3, // 📱 Mobile view
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "22px", sm: "32px" } }} // 📱 Mobile view
        >
          Checkout
        </Typography>

        <Typography variant="h6">
          Total Items: {cart.items.length}
        </Typography>
        <Typography variant="h6" mt={1}>
          Total Price: ₹{cart.totalPrice}
        </Typography>

        <Box mt={3}>
          <TextField
            label="Full Name"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small" // 📱 Mobile view
          />

          <TextField
            label="Mobile Number"
            name="mobile"
            value={details.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small" // 📱 Mobile view
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            label="Full Address"
            name="address"
            value={details.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            size="small" // 📱 Mobile view
          />
        </Box>

        <Typography variant="h6" mt={3}>
          Select Payment Method:
        </Typography>

        <RadioGroup
          name="paymentMethod"
          value={details.paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (COD)" />
          <FormControlLabel value="upi" control={<Radio />} label="Scan & Pay (UPI)" />
        </RadioGroup>

        {details.paymentMethod === "upi" && (
          <Box mt={2} textAlign="center">
            <Typography>Scan QR to Pay</Typography>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi:example@upi"
              alt="UPI QR"
              style={{
                width: "200px",
                height: "200px",
                marginTop: "10px",
                maxWidth: "100%", // 📱 Mobile view
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            height: { xs: 48, sm: "auto" }, // 📱 Mobile view
            fontSize: { xs: "16px", sm: "14px" }, // 📱 Mobile view
            borderRadius: 2, // 📱 Mobile view
          }}
          fullWidth
          onClick={handlePayment}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}
