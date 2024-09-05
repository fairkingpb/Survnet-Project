import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Access setUser from context

  const handleLogin = async () => {
    try {
      // Use localhost for local development
      const API_BASE_URL = 'http://localhost:5000';
      const response = await axios.post(`${API_BASE_URL}/survnet-new/Login`, { username, password });

      if (response.status === 200) {
        const { user } = response.data;
        // Update the authentication context with username and role
        setUser({ username: user.username, role: user.role });
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        alert(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Check your network connection.');
      } else {
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          paddingTop: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'left',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#12B76A',
            fontWeight: 'bold',
            marginBottom: 0,
            marginLeft: 3,
            fontSize: 20,
          }}
        >
          SURVNET
        </Typography>

        <Box
          sx={{
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 1,
            marginTop: 1,
            textAlign: 'center',
            maxWidth: '100%',
            marginLeft: '0',
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
              maxWidth: '100%',
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#12B76A',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#12B76A',
                },
              },
              '& .MuiInputBase-input': {
                padding: '10px',
                fontSize: '0.875rem',
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              maxWidth: '100%',
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#12B76A',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#12B76A',
                },
              },
              '& .MuiInputBase-input': {
                padding: '10px',
                fontSize: '0.875rem',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              width: '100%',
              maxWidth: '100%',
              backgroundColor: '#12B76A',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0f9d58',
                transform: 'translateX(5px)',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
