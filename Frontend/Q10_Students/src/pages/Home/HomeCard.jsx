import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material';
import StudentModal from './StudentModal';
import { apiUrl } from '../../actions/constants';

export default function HomeCard() {
  const [userData, setUserData] = useState(null);
  const [documentNumber, setDocumentNumber] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/students/${documentNumber}`);
      setUserData(response.data?.data);
      setId(response.data?.data?.id);
    } catch (error) {
      setUserData(null);
      if (error.response) {
        console.error('Error en la solicitud:', error.response.data);
      }
    }
    setOpenModal(true);
  };

  useEffect(() => {
    if (userData !== null) {
      setOpenModal(true);
    }
  }, [userData]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <CardContent>
          
          {/* TITLE */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: '#1e293b' }}
          >
            Buscar Estudiante
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: '#64748b', mb: 2 }}
          >
            Ingresa el documento para consultar la información.
          </Typography>

          {/* FORM */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
              setDocumentNumber('');
            }}
          >
            <TextField
              label="Documento de identidad"
              variant="outlined"
              fullWidth
              size="small"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <CardActions sx={{ p: 0 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  backgroundColor: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#1d4ed8'
                  }
                }}
              >
                Buscar
              </Button>
            </CardActions>
          </Box>

        </CardContent>
      </Card>

      <StudentModal
        open={openModal}
        handleClose={handleCloseModal}
        userData={userData}
        id={id}
      />
    </>
  );
}