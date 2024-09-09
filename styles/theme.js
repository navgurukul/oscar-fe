
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
    h1: {
      fontFamily: "Spectral, sans-serif",
      fontSize: '6rem',
      fontWeight: 600,
      lineHeight:"150%",
    },
    h2:{
      fontFamily:"Spectral, sans-serif",
      fontSize: '4.5rem',
      fontWeight: 600,
      lineHeight:"150%",
    },
    h3:{
      fontFamily:"Spectral, sans-serif",
      fontSize: '3.5rem',
      lineHeight:"150%",
      fontWeight:"bold",
    },
    h4: {
      fontSize: '2.625rem',
      fontWeight: "bold",
      fontFamily: 'Spectral, serif',
      lineHeight:"150%",
    },
    h5: {
      fontSize: '2rem',
      fontWeight: "bold",
      fontFamily:"Spectral, sans-serif",
      lineHeight:"150%",
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: "bold",
      fontFamily:"Spectral, sans-serif",
      lineHeight:"150%",

    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight:"170%",
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight:"170%",
    },
    body1: {
      fontFamily: "Karla, sans-serif",
      fontSize: '1.125rem',
      lineHeight:"170%",
      fontWeight: "normal",
    },
    body2: {
      fontFamily: "Karla, sans-serif",
      fontSize: '0.875rem',
      lineHeight:"170%",
      fontWeight: "normal",
    },
    buttonlarge: {
      fontSize: '1.25rem',
      fontWeight: 600,
      textTransform: 'none',
      lineHeight:"170%",
    },
    buttonsmall: {
      fontSize: '0.875rem',
      textTransform: 'none',
      lineHeight:"170%",
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight:"150%",
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'uppercase',
      lineHeight:"150%",
    },
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

