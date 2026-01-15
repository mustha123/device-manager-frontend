import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/order/getgetorderdevicebyid");
    setOrders(res.data.orders);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/order/update-item-status/${id}`,
      { status }
    );
    fetchOrders();
  };

  return (
    <Table>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={order._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>

            <TableCell>
              {order.orderStatus !== "Delivered" && (
                <Button onClick={() => updateStatus(order._id, "Shipped")}>
                  Ship
                </Button>
              )}

              {order.orderStatus === "Shipped" && (
                <Button onClick={() => updateStatus(order._id, "Delivered")}>
                  Deliver
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

