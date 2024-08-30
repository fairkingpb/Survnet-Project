import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  AlertTriangle, 
  BarChart2, 
  History, 
  Users, 
  GraduationCap, 
  UserCog, 
  FileSpreadsheet, 
  ClipboardList,
  Menu as MenuIcon
} from 'lucide-react';

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { text: 'Live Monitoring', path: '/live-monitoring', icon: <Monitor size={20} /> },
  { text: 'Incident Reports', path: '/incident-reports', icon: <AlertTriangle size={20} /> },
  { text: 'Exam Setup', path: '/exam-setup', icon: <ClipboardList size={20} /> },
  { text: 'Proctor Management', path: '/proctors', icon: <UserCog size={20} /> },
  { text: 'Student Management', path: '/students', icon: <Users size={20} /> },
  { text: 'Course Management', path: '/courses', icon: <GraduationCap size={20} /> },
  { text: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
  { text: 'Reports', path: '/reports', icon: <FileSpreadsheet size={20} /> },
  { text: 'Exam History', path: '/history', icon: <History size={20} /> },
];

const SideNav = ({ isExpanded, onToggle }) => {
  return (
    <>
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'fixed',
          top: 64,
          left: isExpanded ? 180 : 50,
          zIndex: 1100,
          transition: 'left 0.3s ease',
          backgroundColor: '#e9f2ee',
          borderRadius: 1,
          width: 40,
          height: 40,
        }}
      >
        <MenuIcon size={20} />
      </IconButton>
      <Box
        sx={{
          width: isExpanded ? 180 : 50,
          height: 'calc(100vh - 64px)', // Subtract the height of TopNav
          backgroundColor: '#e9f2ee',
          position: 'fixed',
          top: 64, // Start below TopNav
          left: 0,
          boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        <List sx={{ padding: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              sx={{
                transition: 'all 0.3s ease',
                padding: '4px 8px',
                '&:hover': {
                  backgroundColor: '#12B76A',
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#12B76A',
                  minWidth: '30px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '13px',
                  fontWeight: 'medium',
                  color: '#12B76A',
                }}
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SideNav;