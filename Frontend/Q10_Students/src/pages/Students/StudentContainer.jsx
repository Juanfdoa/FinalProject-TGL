import React from 'react';
import { Box } from '@mui/material';

import NavBar from '../../routes/NavBar';
import Student from './Student';

const StudentContainer = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      
      <NavBar />

      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: 2
        }}
      >
        <Student />
      </Box>

    </Box>
  );
};

export default StudentContainer;