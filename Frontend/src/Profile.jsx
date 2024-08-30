import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Grid, Divider } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Ensure you import your AuthContext

const Profile = ({ isSideNavExpanded }) => {
  const { user } = useAuth(); // Get the current user from context
  const [profileData, setProfileData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Fetch user data from backend
    if (user) {
      axios.get(`/survnet-new/profile/${encodeURIComponent(user.username)}`)
        .then(response => {
          setProfileData({
            ...profileData,
            username: response.data.user.username,
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // Validate password match
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Send updated data to backend
    axios.put(`/survnet-new/profile/${encodeURIComponent(user.username)}`, {
      username: profileData.username,
      newPassword: profileData.newPassword,
    })
      .then(response => {
        setEditMode(false);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      });
  };

  return (
    <Box
      sx={{
        marginLeft: isSideNavExpanded ? '180px' : '50px',
        padding: 3,
        backgroundColor: 'white',
        minHeight: '100vh',
        marginTop: 12,
        transition: 'margin-left 0.3s ease',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            fullWidth
            disabled={!editMode}
          />
        </Grid>
      </Grid>

      {editMode && (
        <>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={profileData.newPassword}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          {passwordError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {passwordError}
            </Typography>
          )}
        </>
      )}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
      >
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </Button>
    </Box>
  );
};

export default Profile;
