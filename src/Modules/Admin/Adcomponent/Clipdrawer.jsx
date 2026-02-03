import React, { useState } from 'react'
import {
  Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography,
  Divider, ListItem, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DevicesOtherTwoToneIcon from '@mui/icons-material/DevicesOtherTwoTone';
import { useNavigate, Link } from 'react-router-dom';

const drawerWidth = 260;

export default function Clipdrawer() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false); // 📱 Mobile view

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 1, mt: 2 }}>
      <List>
        {[
          { text: "Dashboard", icon: <GroupAddIcon />, path: "/admin/*" },
          { text: "View Users", icon: <GroupAddIcon />, path: "/admin/viewuser" },
          { text: "Add Device", icon: <DeviceHubIcon />, path: "/admin/addevice" },
          { text: "View Device Details", icon: <DevicesOtherTwoToneIcon />, path: "/admin/viewdevice" },
          { text: "Manage Delivery Status", icon: <DevicesOtherTwoToneIcon />, path: "/admin/managedeliverystatus" }
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)} // 📱 Mobile view
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #000000ff 0%, #764ba2 100%)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }} // 📱 Mobile view
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }}>
            🎯 Admin Management
          </Typography>

          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }} // 📱 Mobile view
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }, // 📱 Mobile view
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #9bb2ddff 0%, #e9ecef 100%)'
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
