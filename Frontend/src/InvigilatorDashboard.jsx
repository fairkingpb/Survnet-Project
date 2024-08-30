import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings'; // Ensure you are only importing SettingsIcon from here
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import SchoolIcon from '@mui/icons-material/School';
import { User, LogOut, UserCircle } from 'lucide-react';
import TopNav from './TopNav'; // Import TopNav
import MainContent from './MainContent'; // Import MainContent

// Custom side navigation items for the Invigilator Dashboard
const invigilatorMenuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Live Monitoring', path: '/live-monitoring', icon: <MonitorIcon /> },
  // Exclude some items like Incident Reports, Analytics, etc.
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

const InvigilatorDashboard = () => {
  return (
    <div>
      <TopNav />
      <InvigilatorSideNav />
      <MainContent />
    </div>
  );
};

export default InvigilatorDashboard;
