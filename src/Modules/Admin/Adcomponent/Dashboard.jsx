import { useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { UserContext } from '../../../ContextProvider';
import api from '../../../api';

export default function Dashboard() {
  const { host } = useContext(UserContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await api.get('/api/order/admin/dashboard');
    setStats(res.data);
  };

  if (!stats) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 }, // 📱 Mobile view
        ml: { xs: 0, sm: "260px" }, // 📱 Mobile view (drawer space only desktop)
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Typography
        variant="h4"
        mb={4}
        fontWeight="bold"
        sx={{ fontSize: { xs: "22px", sm: "32px" } }} // 📱 Mobile view
      >
        📊 Admin Dashboard
      </Typography>

      {/* SUMMARY */}
      <Grid container spacing={3}> {/* 📱 Mobile view */}
        <StatCard title="Users" value={stats.totalUsers} icon={<PeopleIcon />} gradient="linear-gradient(135deg, #667eea, #764ba2)" />
        <StatCard title="Devices" value={stats.totalDevices} icon={<DevicesIcon />} gradient="linear-gradient(135deg, #43cea2, #185a9d)" />
        <StatCard title="Orders" value={stats.totalOrders} icon={<ShoppingCartIcon />} gradient="linear-gradient(135deg, #f7971e, #ffd200)" />
        <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} icon={<CurrencyRupeeIcon />} gradient="linear-gradient(135deg, #ff512f, #dd2476)" />
      </Grid>

      {/* DELIVERY STATUS */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          🚚 Delivery Status
        </Typography>

        <Grid container spacing={3}> {/* 📱 Mobile view */}
          <StatusCard label="Pending" value={stats.deliveryStats.pending} color="error" />
          <StatusCard label="Shipping" value={stats.deliveryStats.shipping} color="warning" />
          <StatusCard label="Delivered" value={stats.deliveryStats.delivered} color="success" />
        </Grid>
      </Box>
    </Box>
  );
}

/* COMPONENTS */

const StatCard = ({ title, value, icon, gradient }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        color: "white",
        background: gradient,
        boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{title}</Typography>
          <Typography variant="h4" fontWeight="bold">{value}</Typography>
        </Box>
        <Box sx={{ fontSize: 40 }}>{icon}</Box>
      </Box>
    </Card>
  </Grid>
);

const StatusCard = ({ label, value, color }) => (
  <Grid item xs={12} sm={4}>
    <Card sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
      <Chip label={label} color={color} sx={{ fontWeight: "bold", mb: 1 }} />
      <Typography variant="h4" fontWeight="bold">{value}</Typography>
    </Card>
  </Grid>
);
