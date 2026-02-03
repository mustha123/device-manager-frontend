import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
  Select, MenuItem, Paper, Box
} from "@mui/material";
import api from '../../../api';
import { API_URL } from "../../../config";

export default function ManageDeliveryStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/order/admin-orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, mt: 2 }}> {/* 📱 Mobile view */}
      <Typography
        variant="h4"
        fontFamily="monospace"
        sx={{ mb: 2, fontSize: { xs: "20px", sm: "32px" } }} // 📱 Mobile view
      >
        Manage User Delivery Status
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: { xs: "100%", sm: "80%" }, // 📱 Mobile view
          overflowX: "auto", // 📱 Mobile view (horizontal scroll)
          border: "2px solid #1976d2"
        }}
      >
        <Table sx={{ minWidth: 650 }}> {/* 📱 Mobile view */}
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>SL NO</TableCell>
              <TableCell sx={{ color: "white" }}>Product Image</TableCell>
              <TableCell sx={{ color: "white" }}>Product ID</TableCell>
              <TableCell sx={{ color: "white" }}>Product Name</TableCell>
              <TableCell sx={{ color: "white" }}>Delivery Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders
              .flatMap(order =>
                order.items.map(item => ({ order, item }))
              )
              .map(({ order, item }, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <img
                      src={`${API_URL}/uploads/${item.deviceId.device_image}`}
                      width={70}
                      style={{ borderRadius: 6 }}
                      alt="product"
                    />
                  </TableCell>

                  <TableCell>{item.deviceId._id}</TableCell>
                  <TableCell>{item.deviceId.device_name}</TableCell>

                  <TableCell>
                    <Select
                      value={item.shippingStatus}
                      onChange={async (e) => {
                        const newStatus = e.target.value;

                        await api.put(
                          `/api/order/admin/update-delivery-status/${order._id}/${item._id}`,
                          { shippingStatus: newStatus }
                        );

                        setOrders(prev =>
                          prev.map(o =>
                            o._id === order._id
                              ? {
                                  ...o,
                                  items: o.items.map(it =>
                                    it._id === item._id
                                      ? { ...it, shippingStatus: newStatus }
                                      : it
                                  )
                                }
                              : o
                          )
                        );
                      }}
                      size="small"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipping">Shipping</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
