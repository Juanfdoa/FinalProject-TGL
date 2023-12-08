import React, { useState, useEffect } from 'react';
import { handleSearch, handleDelete, handleAdd } from '../../actions/subject.js';
import SubjectCard from './SubjectCard';
import ModalAddSubject from './ModalAddSubject';
import Button from '@mui/material/Button';
import '../../../style.css';

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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin:5 }}>
      <h2>Materias</h2>
        <Button variant="contained"  onClick={handleOpenModal}>
          Agregar Materia
        </Button>
        <ModalAddSubject open={openModal} handleClose={handleCloseModal} AddSubject={AddSubject}/>
    </div>
    <div>
      <SubjectCard data={subjects} deleteSubject={deleteSubject}/>
    </div>
  </>
  );
};

export default Subject;