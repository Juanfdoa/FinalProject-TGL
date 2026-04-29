import React from 'react';
import { Box } from '@mui/material';
import Home from './Home';
import NavBar from '../../routes/NavBar';

const HomeContainer = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      <NavBar />

      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4 },
          py: 3
        }}
      >
        <Home />
      </Box>

    </Box>
  );
};

export default HomeContainer;