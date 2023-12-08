import React, { useState, useEffect } from 'react';
import { handleSearch, handleAdd } from '../../actions/student.js';
import StudentAccordion from './StudentAccordion';
import ModalAddStudent from './ModalAddStudent';
import Button from '@mui/material/Button';
import '../../../style.css';

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin:5 }}>
        <h2>Estudiantes</h2>
          <Button variant="contained" onClick={handleOpenModal}>
            Agregar estudiante
          </Button>
          <ModalAddStudent open={openModal} handleClose={handleCloseModal} AddStudent={AddStudent}/>
      </div>
      <div>
        <StudentAccordion data={students}/>
      </div>
    </>
  );
};

export default Student;