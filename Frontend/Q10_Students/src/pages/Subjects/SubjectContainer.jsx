import React from 'react';
import { Box } from '@mui/material';

import NavBar from '../../routes/NavBar';
import Subject from './subject';

const SubjectContainer = () => {
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
        <Subject />
      </Box>

    </Box>
  );
};

export default SubjectContainer;