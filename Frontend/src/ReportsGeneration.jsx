/*import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, InputAdornment } from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { getReports, addReport, updateReport, deleteReport } from './api'; // Ensure this path is correct

const Reports = ({ isSideNavExpanded }) => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [reportData, setReportData] = useState({
    date: '',
    type: '',
    description: '',
    studentId: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        if (Array.isArray(data)) {
          setReports(data);
          setFilteredReports(data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleAddReport = async () => {
    try {
      if (editing) {
        const updatedReports = [...reports];
        updatedReports[currentIndex] = reportData;
        await updateReport(reportData.id, reportData); // Update API call
        setReports(updatedReports);
        setFilteredReports(updatedReports);
        setEditing(false);
      } else {
        await addReport(reportData); // Add API call
        setReports([...reports, reportData]);
        setFilteredReports([...reports, reportData]);
      }
      setReportData({ date: '', type: '', description: '', studentId: '' });
    } catch (error) {
      console.error('Error adding/updating report:', error);
    }
  };

  const handleEditReport = (index) => {
    setReportData(reports[index]);
    setEditing(true);
    setCurrentIndex(index);
  };

  const handleDeleteReport = async (index) => {
    try {
      await deleteReport(reports[index].id); // Delete API call
      const updatedReports = reports.filter((_, i) => i !== index);
      setReports(updatedReports);
      setFilteredReports(updatedReports);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = reports.filter(report =>
      report.description.toLowerCase().includes(query) || report.type.toLowerCase().includes(query)
    );
    setFilteredReports(filtered);
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
        Reports
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={reportData.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            value={reportData.type}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={reportData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Student ID"
            name="studentId"
            value={reportData.studentId}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleAddReport}
          >
            {editing ? 'Update Report' : 'Add Report'}
          </Button>
        </Grid>
      </Grid>

      <TextField
        label="Search Reports"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        sx={{ marginTop: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.studentId}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditReport(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteReport(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;
*/