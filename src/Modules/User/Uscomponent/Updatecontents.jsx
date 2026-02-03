import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent, Box } from "@mui/material";

export default function Updatecontents() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
        Product not found
      </Typography>
    );
  }

  const goToCheckout = () => {
    navigate("/checkout", { state: product });
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}> {/* 📱 Mobile view */}
      <Card
        sx={{
          maxWidth: 500,
          margin: "20px auto",
          padding: { xs: "15px", sm: "20px" }, // 📱 Mobile view
          borderRadius: 3, // 📱 Mobile view
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "22px", sm: "32px" } }} // 📱 Mobile view
          >
            {product.name}
          </Typography>

          <Typography
            variant="h6"
            mt={2}
            sx={{ fontSize: { xs: "14px", sm: "18px" } }} // 📱 Mobile view
          >
            {product.desc}
          </Typography>

          <Typography
            variant="h5"
            color="green"
            mt={2}
            sx={{ fontSize: { xs: "18px", sm: "22px" } }} // 📱 Mobile view
          >
            ₹{product.price}
          </Typography>

          <Button
            variant="contained"
            color="success"
            fullWidth // 📱 Mobile view
            sx={{
              mt: 3,
              height: { xs: 45, sm: 36 }, // 📱 Mobile view
              fontSize: { xs: "16px", sm: "14px" }, // 📱 Mobile view
              borderRadius: 2,
            }}
            onClick={goToCheckout}
          >
            Add to Cart & Checkout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
