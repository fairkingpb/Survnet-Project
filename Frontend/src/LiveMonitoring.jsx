import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

// LiveFeed Component
const LiveFeed = ({ cameraNumber, onClick, isSelected }) => {
  // Video source path based on cameraNumber
  const videoSrc = `/camera${cameraNumber}.mp4`;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: isSelected ? '500px' : '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#d0f0c0' : 'white', // Highlight background if selected
      }}
      onClick={onClick}
    >
      <Typography variant="h6" gutterBottom>Camera {cameraNumber}</Typography>
      <Box
        sx={{
          width: '100%',
          height: isSelected ? '400px' : '150px',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <video
          width="100%"
          height="100%"
          controls
          src={videoSrc}
          style={{ objectFit: 'cover' }} // Adjust video fit
        />
      </Box>
    </Paper>
  );
};

// LiveMonitoring Component
const LiveMonitoring = ({ isSideNavExpanded }) => {
  const [selectedRoom, setSelectedRoom] = useState('All Rooms');
  const [selectedFeed, setSelectedFeed] = useState(null); // State to manage the selected feed

  const roomData = {
    'All Rooms': [1, 2, 3, 4, 5, 6],
    'LRA': [1, 2],
    'LRB 105': [1, 2, 3],
    'LRB 106': [1, 2, 3, 4],
    'CIVE-AUDITORIUM': [1, 2, 3, 4, 5],
    'FL1': [1, 2],
    'FL2': [1, 2, 3, 4],
  };

  return (
    <Box
      sx={{
        marginLeft: isSideNavExpanded ? '180px' : '50px',
        padding: 3,
        backgroundColor: 'white',
        minHeight: '100vh',
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        transition: 'margin-left 0.3s ease', // Adjust margin based on SideNav toggle
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Live Monitoring Feeds
      </Typography>

      <Box sx={{ mb: 4 }}>
        {Object.keys(roomData).map((room) => (
          <Button
            key={room}
            variant="contained"
            sx={{
              backgroundColor: selectedRoom === room ? '#12B76A' : '#e0e0e0',
              color: selectedRoom === room ? 'white' : '#12B76A',
              '&:hover': {
                backgroundColor: '#12B76A',
                color: 'white',
              },
              mx: 1,
              mb: 1,
            }}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {roomData[selectedRoom].map((cameraNumber) => (
          <Grid item xs={12} sm={6} md={4} key={cameraNumber}>
            <LiveFeed
              cameraNumber={cameraNumber}
              onClick={() => setSelectedFeed(cameraNumber)}
              isSelected={selectedFeed === cameraNumber}
            />
          </Grid>
        ))}
      </Grid>

      {selectedFeed && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: 'white',
              width: '80%',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>Camera {selectedFeed}</Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <video
                width="100%"
                height="100%"
                controls
                src={`/camera${selectedFeed}.mp4`}
                style={{ objectFit: 'cover' }} // Adjust video fit
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#12B76A',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0f9d58',
                },
              }}
              onClick={() => setSelectedFeed(null)}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default LiveMonitoring;
