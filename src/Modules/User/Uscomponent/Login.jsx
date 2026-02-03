import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api';

export default function Login() {
  const [email, setEmail] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/api/user/login', email)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('UserToken', res.data.Token);
          alert("Login Successful");
          navigate('/devicecontents');
        } else {
          alert("Incorrect email or password");
        }
      })
      .catch(() => {
        alert("Login Failed");
      });
  };

  return (
    <div style={{ padding: "20px" }}> {/* 📱 Mobile view */}
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "20px", sm: "30px" }, // 📱 Mobile view
          width: { xs: "100%", sm: "300px" },   // 📱 Mobile view
          margin: "20px auto",
          borderRadius: 3, // 📱 Mobile view
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2> {/* 📱 Mobile view */}

        <TextField
          label="Email"
          variant="outlined"
          onChange={handleChange}
          name="email"
          value={email.email}
          type="email"
          autoComplete="off"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          variant="outlined"
          onChange={handleChange}
          name="password"
          value={email.password}
          type="password"
          autoComplete="new-password"
          fullWidth
          size="small" // 📱 Mobile view
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#ef1027ff',
            height: { xs: 45, sm: 36 }, // 📱 Mobile view
            fontSize: { xs: "16px", sm: "14px" }, // 📱 Mobile view
            borderRadius: 2, // 📱 Mobile view
            mb: 2,
          }}
        >
          Login
        </Button>

        <Button fullWidth sx={{ textTransform: "none" }}> {/* 📱 Mobile view */}
          <Link to='/register' style={{ textDecoration: "none", color: "#1976d2" }}>
            Continue with Register
          </Link>
        </Button>

      </Paper>
    </div>
  );
}
