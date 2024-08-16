import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from '../styles/Loader.module.css'; 

const Loader = () => {
  return (
    <Box className={styles.loaderContainer}>
      <CircularProgress style={{ color: '#51A09B' }} size={80} thickness={4} />
    </Box>
  );
};

export default Loader;
