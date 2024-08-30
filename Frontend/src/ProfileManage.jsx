import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const ProfileManage = ({ isSideNavExpanded }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:5000/survnet-new/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = () => {
    axios.post('http://localhost:5000/survnet-new/users', newUser)
      .then(response => {
        console.log('User created:', response.data);
        setUsers([...users, newUser]);  // Update the users list with the new user
        setNewUser({ username: '', password: '' });  // Reset form
      })
      .catch(error => console.error('Error creating user:', error));
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
        Profile Management
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can manage user profiles, including adding new users and updating existing user permissions.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Add New User</Typography>
        <TextField
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          sx={{ mt: 2, mr: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          sx={{ mt: 2, mr: 2 }}
        />
        <Button variant="contained" onClick={handleCreateUser} sx={{ mt: 2 }}>
          Add User
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Users List</Typography>
        <List>
          {users.map((user, index) => (
            <React.Fragment key={user._id}>
              <ListItem>
                <ListItemText primary={user.username} secondary={`Role: ${user.role}`} />
              </ListItem>
              {index < users.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ProfileManage;
