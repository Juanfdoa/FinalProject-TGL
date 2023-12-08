import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, TextField } from '@mui/material';
import StudentModal from './StudentModal';

export default function HomeCard() {
  const [userData, setUserData] = useState(null);
  const [documentNumber, setDocumentNumber] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/student/${documentNumber}`);
      setUserData(response.data);
      setId(response.data.id)
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
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h3>Buscar Estudiante</h3>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(); 
              setDocumentNumber('');
            }}
          >
            <TextField
              id="documentoIdentidad"
              label="Documento de Identidad"
              variant="outlined"
              fullWidth
              margin="normal"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
            <CardActions>
              <Button type="submit" size="small">
                Buscar
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <StudentModal open={openModal} handleClose={handleCloseModal} userData={userData} id={id}/>
    </>
  );
}

