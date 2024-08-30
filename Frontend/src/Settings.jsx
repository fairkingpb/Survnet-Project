import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideNav from './SideNav';
import TopNav from './TopNav';

const theme = createTheme({
  palette: {
    mode: 'light', // You can toggle between 'light' and 'dark' mode
  },
});

const Settings = () => {
  const [nightMode, setNightMode] = useState(false);
  const [cameraSensitivity, setCameraSensitivity] = useState('Medium');
  const [alertThreshold, setAlertThreshold] = useState('High');
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

  const handleNightModeToggle = () => {
    setNightMode(!nightMode);
    // Add logic here to apply night mode to the app, if needed
  };

  const handleCameraSensitivityChange = (event) => {
    setCameraSensitivity(event.target.value);
  };

  const handleAlertThresholdChange = (event) => {
    setAlertThreshold(event.target.value);
  };

  const handleToggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginLeft: 20,
          marginTop: 10,
          backgroundColor: nightMode ? '#333' : '#fff',
          color: nightMode ? '#fff' : '#000',
        }}
      >
        <TopNav onToggleSideNav={handleToggleSideNav} />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <SideNav isExpanded={isSideNavExpanded} onToggle={handleToggleSideNav} />
          <Box
            sx={{
              flex: 1,
              padding: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Settings
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={nightMode}
                  onChange={handleNightModeToggle}
                  color="primary"
                />
              }
              label="Night Mode"
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Camera Sensitivity</InputLabel>
              <Select
                value={cameraSensitivity}
                onChange={handleCameraSensitivityChange}
                label="Camera Sensitivity"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Alert Threshold</InputLabel>
              <Select
                value={alertThreshold}
                onChange={handleAlertThresholdChange}
                label="Alert Threshold"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => alert('Settings saved')}
            >
              Save Settings
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Settings;
