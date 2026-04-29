import React, { useState, useEffect } from 'react';

import {
  handleSearch,
  handleDelete,
  handleAdd,
  handleUpdate
} from '../../actions/subject.js';

import SubjectCard from './SubjectCard';
import ModalAddSubject from './ModalAddSubject';

// 🔥 MUI
import { Box, Button, Typography } from '@mui/material';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getSubjects = async ()=>{
    try 
    {
      const response = await handleSearch();
      setSubjects(response);
    } catch (error) 
    {
      console.error('Error en la solicitud:', error.response.data);
    }
  }
  
  const deleteSubject = async (id) => {
    try {
      await handleDelete(id);
      getSubjects();
    } catch (error) 
    {
      console.error('Error al eliminar la materia:', error.response.data);
    }
  };

  const AddSubject = async (name,teacher) => {
    try {
      await handleAdd(name, teacher);
      getSubjects();
    } catch (error) 
    {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  const UpdateSubject = async(id,name,teacher)=>{
    try {
      await handleUpdate(id, name, teacher);
      getSubjects();
    } catch (error) 
    {
      console.error('Error al realizar la solicitud PUT:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  useEffect(() => {   
    getSubjects(); 
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
          Materias
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Administra las asignaturas y sus profesores
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
        Agregar materia
      </Button>
    </Box>

    {/* CONTENT */}
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      <SubjectCard
        data={subjects}
        deleteSubject={deleteSubject}
        UpdateSubject={UpdateSubject}
      />
    </Box>

    {/* MODAL */}
    <ModalAddSubject
      open={openModal}
      handleClose={handleCloseModal}
      AddSubject={AddSubject}
    />
  </>
);
};

export default Subject;