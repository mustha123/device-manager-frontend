import React, { useState } from "react";
import { useEffect } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../ContextProvider';
import { useContext } from 'react';




export default function AdminLogin() {
  const context = useContext(UserContext);
console.log("CONTEXT:", context);

const { host } = context || {};

  const navigate = useNavigate();
 useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    // navigate("/admin/*", { replace: true });
  }
}, [navigate]);



  const [errorMsg, setErrorMsg] = useState("");
const [loading, setLoading] = useState(false);

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
  
    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter email and password");
      return;
    }
  
    try {
      setLoading(true);
  
      const res = await axios.post(
        `${host}/api/admin/adminlogin`,
        formData
      );
      console.log("HOST:", host);
  
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.adminToken);
        navigate("/admin");
      } else {
        setErrorMsg(res.data.message || "Invalid email or password");
      }
    } catch (error) {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #e8ebef31, #7f7378ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(236, 63, 89, 0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        {errorMsg && (
  <Typography
    color="error"
    align="center"
    mb={2}
    fontWeight="bold"
  >
    {errorMsg}
  </Typography>
)}

        <Typography
          variant="h4"
          mb={3}
          align="center"
          sx={{ fontWeight: "bold", color: "#e157edff" }}
        >
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            margin="normal"
            autoComplete='off'
            onChange={handleChange}
            sx={{
              input: { color: "#fff" },
              label: { color: "#cfd3db" },
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            name="password"
            autoComplete="new-password"
            margin="normal"
            onChange={handleChange}
            sx={{
              input: { color: "#fff" },
              label: { color: "#cfd3db" },
            }}
          />

<Button
  variant="contained"
  type="submit"
  fullWidth
  disabled={loading}
  sx={{
    mt: 3,
    py: 1.2,
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "30px",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#0b080dff",
      transform: "scale(1.05)",
    },
  }}
>
  {loading ? "Logging in..." : "Login"}
</Button>

        </form>
      </Paper>
    </Box>
  );
}
