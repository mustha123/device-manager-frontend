import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Button, Paper, Box
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../../../api';

export default function Viewuser() {
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await api.get('/api/user/getuser');
      setAllusers(response.data.getusers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (mid) => {
    api.delete(`/api/user/deleteuser/${mid}`)
      .then(() => {
        alert('User deleted successfully');
        fetchusers();
      })
      .catch(console.log);
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, mt: 2 }}> {/* 📱 Mobile view */}
      <Typography
        variant='h4'
        fontFamily='monospace'
        sx={{ mb: 2, fontSize: { xs: '20px', sm: '32px' } }} // 📱 Mobile view
      >
        View Users
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
        <Table sx={{ minWidth: 750 }}> {/* 📱 Mobile view */}
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>SL.NO</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allusers.map((userdata, index) => (
              <TableRow key={userdata._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{userdata.name}</TableCell>
                <TableCell>{userdata.email}</TableCell>
                <TableCell>{userdata.phone}</TableCell>
                <TableCell>{userdata.address}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small" // 📱 Mobile view
                    onClick={() => handleDelete(userdata._id)}
                  >
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
