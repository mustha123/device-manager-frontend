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

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseUserMenu();
  };

  const pages = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Shop", path: "/devicecontents" },
  ];

  return (
    <AppBar
  position="static"
  sx={{
    backgroundColor: "#020d16cf",
    py: 2,
    width: "100%",
  }}
>
  <Toolbar
    disableGutters
    sx={{
      px: 0, // control side spacing manually
      display: "flex",
      width: "100%",
    }}
  >


          {/* 🔹 LEFT: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ml:'10px'}} alt="Device Logo" src={Avatar1} />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "14px", sm: "18px" } // 📱 Mobile view
              }}
            >
             <Link to="/navigate-1"><Button sx={{ color: "white", fontWeight: "bold" }}>DEVICE MANAGEMENT</Button></Link>
            </Typography>
          </Box>

          {/* 🔹 MOBILE MENU ICON */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}> {/* 📱 Mobile view */}
            <IconButton onClick={handleOpenNavMenu} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => {
                  navigate(page.path);
                  handleCloseNavMenu();
                }}
              >
                {page.title}
              </MenuItem>
            ))}
          </Menu>

          {/* 🔹 DESKTOP NAVIGATION */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" }, // 📱 Mobile view
              justifyContent: "center",
              gap: 3
            }}
          >
            {pages.map((page) => (
              <Button key={page.title} component={Link} to={page.path} sx={{ color: "white" }}>
                {page.title}
              </Button>
            ))}
          </Box>

          {/* 🔹 RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}> {/* 📱 Mobile view */}

           <Button
  component={Link}
  to="/myorders"
  sx={{
    color: "white",
    display: { xs: "none", sm: "inline-flex" },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: 'transparent',
    }
  }}
>
  My Orders
</Button>


            <IconButton component={Link} to="/carts">
              <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 30 }, color: "white" }} /> {/* 📱 Mobile view */}
            </IconButton>

            <Tooltip title="Account Menu">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }} /> {/* 📱 Mobile view */}
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
    </AppBar>
  );
}
