import React, { useState, useEffect } from 'react';
import { handleSearch, handleAdd, handleDelete } from '../../actions/student.js';

import StudentAccordion from './StudentAccordion';
import ModalAddStudent from './ModalAddStudent';

// 🔥 MUI
import { Box, Button, Typography } from '@mui/material';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  const getStudents = async () => {
    try {
      const response = await handleSearch();
      setStudents(response);
    } catch (error) 
    {
      console.error('Error en la solicitud:', error.response.data);
    }
  };

  const AddStudent = async (name, surname, documentNumber, telephone) => {
    try 
    {
      await handleAdd(name,surname,documentNumber,telephone);
      getStudents();
    } 
    catch (error) 
    {
      console.error('Error al agregar estudiante:', error.response.data);
    }
  };
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {   
    getStudents(); 
  }, []);  
  return (
  <>
    {/* HEADER */}
    <Box
      sx={{
        width: '100%',
        mb: 3,
        mt:3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Estudiantes
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Gestiona los estudiantes y sus calificaciones
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          backgroundColor: '#2563eb',
          '&:hover': { backgroundColor: '#1d4ed8' }
        }}
      >
        Agregar estudiante
      </Button>
    </Box>

    {/* CONTENT */}
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      <StudentAccordion
        data={students}
        handleDelete={handleDelete}
        refreshStudents={getStudents}
      />
    </Box>

    {/* MODAL */}
    <ModalAddStudent
      open={openModal}
      handleClose={handleCloseModal}
      AddStudent={AddStudent}
    />
  </>
);
};

export default Student;