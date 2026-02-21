import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api';
import { API_URL } from "../../../config";
export default function Register() {
  const [reg, setReg] = useState({
    uname: '',
    uemail: '',
    upassword: '',
    uphone: '',
    uaddress: ''
  });

  const handleChange = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/api/user/addregisteruser', reg)
      .then(() => {
        alert("Registered Successfully");
        navigate('/login');
      })
      .catch(() => {
        alert("Server error");
      });
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}> {/* 📱 Mobile view */}
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "20px", sm: "30px" }, // 📱 Mobile view
          width: { xs: "100%", sm: "320px" }, // 📱 Mobile view
          margin: "20px auto",
          borderRadius: 3 // 📱 Mobile view
        }}
      >
        <h2 style={{ textAlign: "center" }}>Registration</h2> {/* 📱 Mobile view */}

        <TextField
          label="Name"
          variant="outlined"
          onChange={handleChange}
          name="uname"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          variant="outlined"
          onChange={handleChange}
          name="uemail"
          autoComplete="off"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          variant="outlined"
          onChange={handleChange}
          name="upassword"
          type="password"
          autoComplete="new-password"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone"
          variant="outlined"
          onChange={handleChange}
          name="uphone"
          type="number"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          label="Address"
          variant="outlined"
          onChange={handleChange}
          name="uaddress"
          fullWidth
          multiline // 📱 Mobile view
          rows={2} // 📱 Mobile view
          size="small"
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth // 📱 Mobile view
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#ef1027ff',
            height: { xs: 45, sm: 36 }, // 📱 Mobile view
            fontSize: { xs: "16px", sm: "14px" }, // 📱 Mobile view
            borderRadius: 2,
            mb: 2
          }}
        >
          Register
        </Button>

        <Box textAlign="center"> {/* 📱 Mobile view */}
          <Link to='/login' style={{ textDecoration: "none", color: "#1976d2" }}>
            Continue with Login
          </Link>
        </Box>

      </Paper>
    </Box>
  );
}
