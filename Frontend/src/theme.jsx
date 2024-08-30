// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12B76A', // Custom green color
    },
    background: {
      default: '#ffffff', // Default background is white
    },
  },
  typography: {
    h4: {
      fontWeight: 700, // Example of custom typography
    },
  },
});

export default theme; // Export the theme as default
