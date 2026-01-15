import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Avatar1 from '../../../Assets/avatar.jpg';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Header() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseUserMenu();
  };

  const pages = [
    // { title: "Home", path: "/" },
    // { title: "About", path: "/about" },
    // { title: "Contact", path: "/contact" },
    // { title: "Shop", path: "/shop" },
  ];


  return (
    <AppBar position="static" sx={{ backgroundColor: "#020d16cf", py: 2 }}>
  <Container maxWidth="xl">
    <Toolbar disableGutters sx={{ display: "flex" }}>

      {/* 🔹 LEFT: Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar alt="Device Logo" src={Avatar1} />
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          DEVICE MANAGEMENT
        </Typography>
      </Box>

      {/* 🔹 CENTER: Navigation */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          gap: 3
        }}
      >
        <Button component={Link} to="/" sx={{ color: "white" }}>
          Home
        </Button>
        <Button component={Link} to="/about" sx={{ color: "white" }}>
          About
        </Button>
        <Button component={Link} to="/contact" sx={{ color: "white" }}>
          Contact
        </Button>
        <Button component={Link} to="/devicecontents" sx={{ color: "white" }}>
          Shop
        </Button>
      </Box>

      {/* 🔹 RIGHT: Orders + Cart + User */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

        <Button
          component={Link}
          to="/myorders"
          sx={{ color: "white" }}
        >
          My Orders
        </Button>

        <IconButton component={Link} to="/carts">
          <ShoppingCartIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>

        {/* User Avatar */}
        <Tooltip title="Account Menu">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {!isLoggedIn ? (
            <MenuItem onClick={() => navigate("/login")}>
              Login
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLogout}>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          )}
        </Menu>

      </Box>

    </Toolbar>
  </Container>
</AppBar>

  );
}
