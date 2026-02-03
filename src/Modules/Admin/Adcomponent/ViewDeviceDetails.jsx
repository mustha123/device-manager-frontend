import React, { useEffect, useState } from 'react'
import {
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, Paper
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import api from '../../../api';
import { API_URL } from "../../../config";

export default function ViewDeviceDetails() {
  const [view, setView] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await api.get("/api/device/getdevice");
      setView(response.data.getproducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (cid) => {
    api.delete(`/api/device/deleteitem/${cid}`)
      .then(() => {
        alert('Item deleted successfully');
        fetchusers();
      });
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, mt: 2 }}> {/* 📱 Mobile view */}
      <Typography
        variant='h4'
        fontFamily='monospace'
        sx={{ mb: 2, fontSize: { xs: '20px', sm: '32px' } }} // 📱 Mobile view
      >
        View Device Details
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: { xs: '100%', sm: '80%' }, // 📱 Mobile view
          overflowX: 'auto', // 📱 Mobile view
          borderRadius: 2,
          border: '2px solid #1976d2',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.15)'
        }}
      >
        <Table sx={{ minWidth: 800 }}> {/* 📱 Mobile view */}
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>SLNO</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Brand</TableCell>
              <TableCell sx={{ color: 'white' }}>Image</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {view.map((prod, index) => (
              <TableRow key={prod._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{prod.device_name}</TableCell>
                <TableCell>{prod.device_type}</TableCell>
                <TableCell>{prod.device_brand}</TableCell>

                <TableCell>
                  <img
                    src={`${API_URL}/uploads/${prod.device_image}`}
                    alt="device"
                    style={{ width: 70, borderRadius: 5 }}
                  />
                </TableCell>

                <TableCell>{prod.device_date}</TableCell>
                <TableCell>{prod.device_price}</TableCell>

                <TableCell>
                  <Button component={Link} to={`/admin/updatedevice/${prod._id}`}>
                    <DriveFileRenameOutlineOutlinedIcon />
                  </Button>
                  <Button color="error" onClick={() => handleDelete(prod._id)}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}
