import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent } from "@mui/material";

export default function Updatecontents() {   // 🔥 Uppercase name
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  const goToCheckout = () => {
    navigate("/checkout", { state: product });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "20px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6" mt={2}>{product.desc}</Typography>
        <Typography variant="h5" color="green" mt={2}>₹{product.price}</Typography>

        <Button variant="contained" color="success" sx={{ mt: 3 }} onClick={goToCheckout}>
          Add to Cart & Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
