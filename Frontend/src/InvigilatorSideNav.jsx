import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';

// Custom side navigation items for the Invigilator Dashboard
const invigilatorMenuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Live Monitoring', path: '/live-monitoring', icon: <MonitorIcon /> },
  // Add or remove items as needed
];

const InvigilatorSideNav = () => {
  return (
    <Box
      sx={{
        width: 170,
        height: '100vh',
        backgroundColor: '#e9f2ee',
        position: 'fixed',
        top: 64,
        left: 0,
        boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List>
        {invigilatorMenuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                fontWeight: 'bold',
                backgroundColor: '#12B76A',
                transform: 'translateX(10px)',
                '& .MuiListItemText-primary': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: '#12B76A',
                minWidth: '40px',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 'medium',
                color: '#12B76A',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default InvigilatorSideNav;
