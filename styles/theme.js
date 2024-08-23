
import { createTheme } from '@mui/material/styles';
import { breakpoints } from './constant';

const theme = createTheme({
  palette: {
    primary: {
      main: '#51A09B', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#f0f4f8', 
    },
  },
  typography: {
    fontFamily: "Karla, sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      margin: '20px 0',
    },
    h3:{
      fontFamily:"Spectral, sans-serif"
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 700,
      // fontFamily: 'Georgia, serif', // Different font family for h4
      margin: '15px 0',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      margin: '10px 0',
      fontFamily:"Spectral, sans-serif"
    },
    body1: {
      fontSize: '1rem',
      margin: '10px 0',
    },
    body2:{
      fontFamily: "Karla, sans-serif"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
    },
  },
    breakpoints: breakpoints,
});

export default theme;

