import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Button,
  Typography,
  Divider
} from '@mui/material';
import StudentTable from './StudentTable';
import { apiUrl } from '../../actions/constants';

const StudentModal = ({ open, handleClose, userData, id }) => {
  const [studentRate, setStudentRate] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/rates/${id}`);
      setStudentRate(response.data?.data);
    } catch (error) {
      console.error('Error en la solicitud:', error.response?.data);
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
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          p: 4,
          width: '90%',
          maxWidth: 800,
          borderRadius: 3
        }}
      >
        {/* TITLE */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Información del Estudiante
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* NO DATA */}
        {userData === null && (
          <Typography color="error">
            No se encontraron datos para el estudiante.
          </Typography>
        )}

        {/* STUDENT DATA */}
        {userData && (
          <Box mb={3}>
            <Typography sx={{ color: '#475569', mb: 1 }}>
              <strong>Nombre:</strong> {userData.name} {userData.surname}
            </Typography>

            <Typography sx={{ color: '#475569', mb: 1 }}>
              <strong>Documento:</strong> {userData.documentNumber}
            </Typography>

            <Typography sx={{ color: '#475569' }}>
              <strong>Teléfono:</strong> {userData.telephone}
            </Typography>
          </Box>
        )}

        {/* RATES */}
        {userData && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Notas
            </Typography>

            {studentRate.length > 0 ? (
              <StudentTable data={studentRate} />
            ) : (
              <Typography sx={{ color: '#64748b' }}>
                No hay calificaciones disponibles.
              </Typography>
            )}
          </>
        )}

        {/* ACTION */}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudentModal;