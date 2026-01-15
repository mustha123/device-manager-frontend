import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DevicesOtherTwoToneIcon from '@mui/icons-material/DevicesOtherTwoTone';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



const drawerWidth = 260;


export default function Clipdrawer() {

const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
};

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* AppBar with gradient */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'linear-gradient(135deg, #000000ff 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar>
            <Typography variant="h6"   style={{ fontWeight: 900 ,marginLeft:20}} noWrap component="div">
              🎯 Admin Management
              <Button style={{marginLeft:1000}} onClick={handleLogout} color="error" fontWeight="bold" variant="contained">
  Logout
</Button>
            </Typography>
          </Toolbar>
          

        </AppBar>

        
        
        {/* Drawer with styled background */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #9bb2ddff 0%, #e9ecef 100%)',
              borderRight: '2px solid #b49ea7ff'
            },
          }}
        >
          
          <Toolbar />
          <Box sx={{ overflow: 'auto', padding: 1,marginTop:2 }}>
             <List>
              <ListItem disablePadding sx={{ mt: 1 }}>
                <ListItemButton  
                  component={Link} 
                  to='/admin/*'
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider sx={{ my: 2, borderColor: '#adb5bd' }} />
            
            {/* View Users */}
            <List>
              <ListItem disablePadding sx={{ mt: 1 }}>
                <ListItemButton style={{marginTop:-30}} 
                  component={Link} 
                  to='/admin/viewuser'
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Users" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider sx={{ my: 2, borderColor: '#adb5bd' }} />
            
            {/* Add Device */}
            <List>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton style={{marginTop:-30}}
                  component={Link} 
                  to='/admin/addevice'
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <DeviceHubIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Device" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider sx={{ my: 2, borderColor: '#adb5bd' }} />
            
            {/* View Device Details */}
            <List>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton style={{marginTop:-30}}
                  component={Link} 
                  to='/admin/viewdevice'
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #fee140 0%, #fa709a 100%)',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(250, 112, 154, 0.3)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white',marginTop: '4px' }}>
                    <DevicesOtherTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Device Details" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ my: 2, borderColor: '#adb5bd' }} />
            
            {/* Manage Delivery Status */}
            <List>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton style={{marginTop:-30}}
                  component={Link} 
                  to='/admin/managedeliverystatus'
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #55e769ff 0%, #fee140 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #fee140 0%, #44bae1ff 100%)',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(250, 112, 154, 0.3)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white',marginTop: '4px' }}>
                    <DevicesOtherTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Delivery Status" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider sx={{ my: -1, borderColor: '#1a5da0ff' }} />
          </Box>
        </Drawer>
        
       
          <Toolbar />
         
        
        
      </Box>
    </div>
  )
}