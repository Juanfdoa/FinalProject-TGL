import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Button } from '@mui/material';
import StudentTable from './StudentTable';

const StudentModal = ({ open, handleClose, userData, id}) => {
const [studentRate, setStudentRate] = useState([]);

const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/rates/${id}`);
        setStudentRate(response.data);
    } catch (error) {
        console.error('Error en la solicitud:', error.response.data);
    }
};

useEffect(() => {
    if (userData !== null) {
        handleSearch();
    }
}, [userData]);   

return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 4,maxWidth: 900,minWidth: 300, borderRadius:2}}>
        {userData === null && (
            <p>No se encontraron datos para el estudiante.</p>
        )}
        
        {userData && (
          <div>
            <h2 className='subtitle'>Datos del Estudiante:</h2>
            <p className='tblText'><strong>Nombre:</strong> {userData.name + " " + userData.surname}</p>
            <p className='tblText'><strong>Número documento:</strong> {userData.documentNumber}</p>
            <p className='tblText'><strong>Telefono:</strong> {userData.telephone}</p>

            {studentRate.length > 0 ? (
                <div>
                    <h2 className='subtitle'>Notas</h2>
                    <StudentTable data={studentRate}/>
                </div>
            ) : (
              <p className='text'>No hay calificaciones disponibles.</p>
            )}
          </div>
        )}
        <Button onClick={handleClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default StudentModal;