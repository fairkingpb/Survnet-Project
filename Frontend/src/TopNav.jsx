import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { User, LogOut, Settings, UserCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { Users } from 'lucide-react';
import { Security, CameraAlt } from '@mui/icons-material'; // Import Security and Camera Icons

const TopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = useAuth(); // Use the AuthContext

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null); // Clear the user from context on logout
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#12B76A', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Combined Shield and Camera icons */}
          <Security sx={{ color: 'white', mr: 0.5 }} />
          <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
            SURVNET
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Bell size={20} />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
            <Typography variant="subtitle1" color="white">
              {user ? user.username : 'Guest'}
            </Typography>
            <Typography variant="caption" color="white">
              {user ? `(${user.role})` : ''}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <User color="white" size={24} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem component={Link} to="/Profile">
            <UserCircle size={16} style={{ marginRight: '8px' }} />
            My Profile
          </MenuItem>
          <MenuItem component={Link} to="/ProfileManage">
            <Users size={16} style={{ marginRight: '8px' }} />
            Manage Profiles
            </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogOut size={16} style={{ marginRight: '8px' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;

