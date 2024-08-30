import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ExamSetup = ({ isSideNavExpanded }) => {
  const [examData, setExamData] = useState({
    examName: '',
    duration: '',
    room: '',
    proctor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: value,
    });
  };

  const handleSaveExam = () => {
    console.log('Exam Setup Data:', examData);
    // Logic to save exam setup details
  };

  return (
    <Box
      sx={{
        marginLeft: isSideNavExpanded ? '180px' : '50px', // Adjust margin-left based on SideNav state
        padding: 3,
        backgroundColor: 'white',
        minHeight: '100vh',
        marginTop: 12,
        transition: 'margin-left 0.3s ease', // Smooth transition when SideNav toggles
      }}
    >
      <Typography variant="h4" gutterBottom>
        Exam Setup
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Exam Name"
            name="examName"
            value={examData.examName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={examData.duration}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="room-label">Room</InputLabel>
            <Select
              labelId="room-label"
              name="room"
              value={examData.room}
              onChange={handleInputChange}
            >
              <MenuItem value="LRA">LRA</MenuItem>
              <MenuItem value="FL1">FL1</MenuItem>
              <MenuItem value="FL2">FL2</MenuItem>
              <MenuItem value="CIVE-AUDITORIUM">CIVE-AUDITORIUM</MenuItem>
              <MenuItem value="LRB 105">LRB 105</MenuItem>
              <MenuItem value="LRB 106">LRB 106</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="proctor-label">Proctor</InputLabel>
            <Select
              labelId="proctor-label"
              name="proctor"
              value={examData.proctor}
              onChange={handleInputChange}
            >
              <MenuItem value="Proctor 1">Proctor 1</MenuItem>
              <MenuItem value="Proctor 2">Proctor 2</MenuItem>
              <MenuItem value="Proctor 3">Proctor 3</MenuItem>
              {/* Add more proctors as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleSaveExam}
      >
        Save Exam Setup
      </Button>
    </Box>
  );
};

export default ExamSetup;
