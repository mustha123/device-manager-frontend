import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableRow,
  Button, Typography, TableContainer, Paper, Box
} from "@mui/material";
import api from '../../../api';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/api/order/getgetorderdevicebyid");
    setOrders(res.data.orders);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/api/order/update-item-status/${id}`, { status });
    fetchOrders();
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, mt: 2 }}> {/* 📱 Mobile view */}
      <Typography
        variant="h5"
        mb={2}
        sx={{ fontSize: { xs: "20px", sm: "26px" } }} // 📱 Mobile view
      >
        View Orders
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto", // 📱 Mobile view
        }}
      >
        <Table sx={{ minWidth: 500 }}> {/* 📱 Mobile view */}
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>

                <TableCell>
                  {order.orderStatus !== "Delivered" && (
                    <Button
                      size="small" // 📱 Mobile view
                      onClick={() => updateStatus(order._id, "Shipped")}
                    >
                      Ship
                    </Button>
                  )}

                  {order.orderStatus === "Shipped" && (
                    <Button
                      size="small"
                      onClick={() => updateStatus(order._id, "Delivered")}
                    >
                      Deliver
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
