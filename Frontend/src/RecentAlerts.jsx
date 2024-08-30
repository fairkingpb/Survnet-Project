import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { random } from 'lodash';
import Draggable from 'react-draggable';

const rooms = ['LRA', 'FL1', 'FL2', 'CIVE-AUDITORIUM', 'LRB 105', 'LRB 106'];
const cameras = Array.from({ length: 15 }, (_, i) => `Camera ${i + 1}`);

const getRandomItem = (arr) => arr[random(0, arr.length - 1)];

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const generateAlert = () => ({
      id: Date.now(),
      type: getRandomItem(['Unauthorized Material', 'Suspicious Pose', 'Suspicious Activity']),
      location: getRandomItem(rooms),
      camera: getRandomItem(cameras),
      time: new Date().toISOString(),
    });

    const timer = setInterval(() => {
      const newAlert = generateAlert();
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 5));
      setIsVisible(true);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alerts.length === 0) {
      setIsVisible(false);
    }
  }, [alerts]);

  return (
    isVisible && (
      <Draggable>
        <Box
          sx={{
            position: 'fixed',
            top: 70,
            right: 200,
            width: '160px',
            maxHeight: '20%',
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 3,
            zIndex: 90000,
            overflowY: 'auto',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            cursor: 'move', // Changes the cursor to indicate that the component is draggable
          }}
        >
          <Typography variant="subtitle2" sx={{ display: 'flex', color: 'red', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
            <NotificationsIcon sx={{ color: 'red', fontSize: '1rem' }} /> Recent Alerts
          </Typography>
          {alerts.map((alert) => (
            <Paper
              key={alert.id}
              elevation={2}
              sx={{ padding: '4px', marginBottom: '4px', borderRadius: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}
            >
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                {alert.type === 'Unauthorized Material' && <WarningIcon sx={{ color: '#f44336', fontSize: '1rem' }} />}
                {alert.type === 'Suspicious Pose' && <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />}
                {alert.type === 'Suspicious Activity' && <WarningIcon sx={{ color: '#ff9800', fontSize: '1rem' }} />}
                <span>{alert.type}</span>
              </Typography>
              <Typography variant="caption">{alert.location}</Typography>
              <Typography variant="caption">{alert.camera}</Typography>
              <Typography variant="caption">{new Date(alert.time).toLocaleTimeString()}</Typography>
            </Paper>
          ))}
          <IconButton
            sx={{ position: 'absolute', top: '4px', right: '4px', color: '#888', padding: '4px' }}
            onClick={() => {
              setAlerts([]);
              setIsVisible(false);
            }}
          >
            <CloseIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </Draggable>
    )
  );
};

export default RecentAlerts;
