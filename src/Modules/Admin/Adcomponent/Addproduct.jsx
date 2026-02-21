import { Box } from '@mui/system';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import api from '../../../api';

export default function Addproduct() {

  const [device, setDevice] = useState({
    dname: '',
    dtype: '',
    dbrand: '',
    dimage: '',
    ddate: '',
    dprice: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'dimage') {
      setDevice({ ...device, dimage: e.target.files[0] });
    } else {
      setDevice({ ...device, [e.target.name]: e.target.value });
    }
  };

  const handleokay = () => {
    const data = new FormData();
    Object.keys(device).forEach(key => data.append(key, device[key]));

     api.post('/api/device/adddevice', data, 
      { headers: { "Content-Type": "multipart/form-data" }}
    )
    .then(() => alert("Product added successfully"))
    .catch(err => console.log(err));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: { xs: 2, sm: 4 }, // 📱 Mobile view
        px: 2 // 📱 Mobile view
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: '100%', sm: '600px' }, // 📱 Mobile view
          padding: { xs: '20px 15px', sm: '25px' }, // 📱 Mobile view
          borderRadius: 3 // 📱 Mobile view
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}> {/* 📱 Mobile view */}
          ADD DEVICE DETAILS
        </Typography>

        <TextField
          variant='outlined'
          label='Name'
          onChange={handleChange}
          name='dname'
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
       required />

        <TextField
          variant='outlined'
          label='Type'
          onChange={handleChange}
          name='dtype'
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
       required />

        <TextField
          variant='outlined'
          label='Brand'
          onChange={handleChange}
          name='dbrand'
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        required/>

        <TextField
          variant='outlined'
          label='Image'
          type='file'
          name='dimage'
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
       required />

        <TextField
          variant='outlined'
          label='Date'
          type='date'
          name='ddate'
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        required/>

        <TextField
          variant='outlined'
          label='Price'
          type='number'
          name='dprice'
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          sx={{ mb: 3 }}
        required />

        <Button
          variant='contained'
          fullWidth // 📱 Mobile view
          onClick={handleokay}
          color='error'
          sx={{
            height: { xs: 45, sm: 40 }, // 📱 Mobile view
            fontSize: { xs: '16px', sm: '14px' }, // 📱 Mobile view
            borderRadius: 2
          }}
        >
          ADD
        </Button>
      </Paper>
    </Box>
  );
}
