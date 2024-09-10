import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const incidentReports = [
  { id: 1, date: '2024-08-10', room: 'LRA', type: 'Unauthorized Material', description: 'Unauthorized material detected in LRA.' },
  { id: 2, date: '2024-08-11', room: 'FL1', type: 'Suspicious Pose', description: 'Suspicious pose detected in FL1.' },
  { id: 3, date: '2024-08-12', room: 'LRB 106', type: 'Unauthorized Activity', description: 'Unauthorized activity in LRB 106.' },
  // Add more sample reports as needed
];

const IncidentReports = ({ isSideNavExpanded }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterRoom, setFilterRoom] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const handleSearch = (event) => setSearchQuery(event.target.value);
  const handleFilterDateChange = (event) => setFilterDate(event.target.value);
  const handleFilterRoomChange = (event) => setFilterRoom(event.target.value);
  const handleFilterTypeChange = (event) => setFilterType(event.target.value);

  const filteredReports = incidentReports.filter((report) => {
    return (
      (!filterDate || report.date === filterDate) &&
      (!filterRoom || report.room === filterRoom) &&
      (!filterType || report.type === filterType) &&
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box
      sx={{
        marginLeft: isSideNavExpanded ? '200px' : '65px', // Adjust margin based on SideNav state
        padding: 3,
        backgroundColor: 'white',
        minHeight: '100vh',
        marginTop: 12,
        transition: 'margin-left 0.3s ease', // Smooth transition
      }}
    >
      <Typography variant="h4" gutterBottom>Incident Reports</Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mr: 2 }}
        />

        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Date</InputLabel>
          <Select value={filterDate} onChange={handleFilterDateChange} label="Date">
            <MenuItem value="">All Dates</MenuItem>
            <MenuItem value="2024-08-10">2024-08-10</MenuItem>
            <MenuItem value="2024-08-11">2024-08-11</MenuItem>
            <MenuItem value="2024-08-12">2024-08-12</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Room</InputLabel>
          <Select value={filterRoom} onChange={handleFilterRoomChange} label="Room">
            <MenuItem value="">All Rooms</MenuItem>
            <MenuItem value="LRA">LRA</MenuItem>
            <MenuItem value="FL1">FL1</MenuItem>
            <MenuItem value="LRB 106">LRB 106</MenuItem>
            {/* Add more rooms as needed */}
          </Select>
        </FormControl>

        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select value={filterType} onChange={handleFilterTypeChange} label="Type">
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Unauthorized Material">Unauthorized Material</MenuItem>
            <MenuItem value="Suspicious Pose">Suspicious Pose</MenuItem>
            <MenuItem value="Unauthorized Activity">Unauthorized Activity</MenuItem>
            {/* Add more types as needed */}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.room}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => setSelectedReport(report)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedReport && (
        <Box
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            width: '100%',
            height: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 14000,
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
            <Typography variant="h4" gutterBottom>Incident Details</Typography>
            <Typography variant="h6">Date: {selectedReport.date}</Typography>
            <Typography variant="h6">Room: {selectedReport.room}</Typography>
            <Typography variant="h6">Type: {selectedReport.type}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{selectedReport.description}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#12B76A',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0f9d58',
                },
              }}
              onClick={() => setSelectedReport(null)}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#12B76A',
          color: 'white',
          mt: 4,
          '&:hover': {
            backgroundColor: '#0f9d58',
          },
        }}
        onClick={() => alert('Add new report functionality goes here')}
      >
        Add New Report
      </Button>
    </Box>
  );
};

export default IncidentReports;
