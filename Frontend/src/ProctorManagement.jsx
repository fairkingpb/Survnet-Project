import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, List, ListItem, ListItemText } from '@mui/material';

const ProctorManagement = ({ isSideNavExpanded }) => {
  const [proctorData, setProctorData] = useState({
    proctorName: '',
    examRoom: '',
    schedule: '',
  });

  const [proctors, setProctors] = useState([
    { name: 'Proctor 1', room: 'LRA', schedule: '9:00 AM - 12:00 PM' },
    { name: 'Proctor 2', room: 'FL1', schedule: '1:00 PM - 4:00 PM' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProctorData({
      ...proctorData,
      [name]: value,
    });
  };

  const handleAssignProctor = () => {
    // Logic to assign a proctor to a room and schedule
    setProctors([...proctors, proctorData]);
    console.log('Proctor Assigned:', proctorData);
    // Here you would typically make a POST request to your backend server to save the data
    setProctorData({
      proctorName: '',
      examRoom: '',
      schedule: '',
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
        Proctor Management
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Proctor Name"
            name="proctorName"
            value={proctorData.proctorName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="examRoom-label">Exam Room</InputLabel>
            <Select
              labelId="examRoom-label"
              name="examRoom"
              value={proctorData.examRoom}
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
          <TextField
            label="Schedule"
            name="schedule"
            value={proctorData.schedule}
            onChange={handleInputChange}
            fullWidth
            placeholder="e.g., 9:00 AM - 12:00 PM"
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleAssignProctor}
      >
        Assign Proctor
      </Button>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Assigned Proctors
        </Typography>
        <List>
          {proctors.map((proctor, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${proctor.name} - Room: ${proctor.room}`}
                secondary={`Schedule: ${proctor.schedule}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ProctorManagement;
