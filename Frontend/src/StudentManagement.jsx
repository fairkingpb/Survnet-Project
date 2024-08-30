import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, InputAdornment } from '@mui/material';
import { Add, Edit, Delete, History, Warning, Search } from '@mui/icons-material'; // Import Search icon
import { getStudentData, addStudentData, updateStudentData, deleteStudentData, fetchIncidentHistory } from './api'; // Ensure this path is correct

const StudentManagement = ({ isSideNavExpanded }) => {
  const [students, setStudents] = useState([]); // Initialize with empty array
  const [filteredStudents, setFilteredStudents] = useState([]); // Initialize with empty array
  const [studentData, setStudentData] = useState({
    name: '',
    id: '',
    course: '',
    year: '',
    status: 'Clear', // AI status
  });
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudentData();
        if (Array.isArray(data)) {
          setStudents(data);
          setFilteredStudents(data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleAddStudent = async () => {
    try {
      if (editing) {
        const updatedStudents = [...students];
        updatedStudents[currentIndex] = studentData;
        await updateStudentData(studentData.id, studentData); // Update API call
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setEditing(false);
      } else {
        await addStudentData(studentData); // Add API call
        setStudents([...students, studentData]);
        setFilteredStudents([...students, studentData]);
      }
      setStudentData({ name: '', id: '', course: '', year: '', status: 'Clear' });
    } catch (error) {
      console.error('Error adding/updating student:', error);
    }
  };

  const handleEditStudent = (index) => {
    setStudentData(students[index]);
    setEditing(true);
    setCurrentIndex(index);
  };

  const handleDeleteStudent = async (index) => {
    try {
      await deleteStudentData(students[index].id); // Delete API call
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(query) || student.id.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const viewIncidentHistory = async (studentId) => {
    try {
      const history = await fetchIncidentHistory(studentId); // Fetch incident history
      // You can implement a modal or separate view to display this information
      console.log(history);
    } catch (error) {
      console.error('Error fetching incident history:', error);
    }
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
        Student Management
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Student ID"
            name="id"
            value={studentData.id}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Course"
            name="course"
            value={studentData.course}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year of Study"
            name="year"
            value={studentData.year}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleAddStudent}
          >
            {editing ? 'Update Student' : 'Add Student'}
          </Button>
        </Grid>
      </Grid>

      <TextField
        label="Search Students"
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
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    {student.status === 'Flagged' && (
                      <Tooltip title="Student is flagged for suspicious behavior">
                        <Warning color="warning" />
                      </Tooltip>
                    )}
                    {student.status}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditStudent(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudent(index)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => viewIncidentHistory(student.id)}>
                      <History />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentManagement;
