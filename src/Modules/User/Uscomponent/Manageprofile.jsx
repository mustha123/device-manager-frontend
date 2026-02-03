import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../../api';

export default function Manageprofile() {
  const [profile, setProfile] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    uaddress: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem('UserToken');
    if (token) {
      api.get('/api/user/Getprofile', { headers: { Authorization: token } })
        .then((res) => {
          const userdata = res.data.user;
          setProfile({
            uname: userdata.name,
            uemail: userdata.email,
            uphone: userdata.phone,
            uaddress: userdata.address
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleprofileupdate = () => {
    const token = localStorage.getItem('UserToken');
    api.put('/api/user/manageprofile', profile, { headers: { Authorization: token } })
      .then((res) => {
        alert(res.data.message);
        setProfile(res.data.user);
      })
      .catch((error) => {
        alert(error.message);
      });
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
        <Typography variant="h5" mb={3} textAlign="center"> {/* 📱 Mobile view */}
          Manage Profile
        </Typography>

        <TextField
          variant='outlined'
          label='Name'
          onChange={handleChange}
          value={profile.uname}
          name='uname'
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          variant='outlined'
          label='Email'
          onChange={handleChange}
          value={profile.uemail}
          name='uemail'
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          variant='outlined'
          label='Phone'
          onChange={handleChange}
          value={profile.uphone}
          name='uphone'
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          variant='outlined'
          label='Address'
          onChange={handleChange}
          value={profile.uaddress}
          name='uaddress'
          fullWidth
          multiline // 📱 Mobile view
          rows={3}   // 📱 Mobile view
          size="small"
          sx={{ mb: 3 }}
        />

        <Button
          variant='contained'
          fullWidth
          onClick={handleprofileupdate}
          sx={{
            height: { xs: 45, sm: 40 }, // 📱 Mobile view
            fontSize: { xs: '16px', sm: '14px' }, // 📱 Mobile view
            borderRadius: 2
          }}
          color='error'
        >
          UPDATE PROFILE
        </Button>
      </Paper>
    </Box>
  );
}
