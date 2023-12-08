import React, { useState} from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalAddStudent = ({ open, handleClose, AddStudent }) => { 
const [name, setName] = useState('');
const [surname, SetSurname] = useState('');
const [documentNumber, setDocumentNumber] = useState('');
const [telephone, setTelephone] = useState('');

const handleAdd = () => {
    AddStudent(name, surname,documentNumber,telephone);
    setName('');
    SetSurname('');
    setDocumentNumber('');
    setTelephone('');
    handleClose();
};

return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,maxWidth: 900,minWidth: 300, borderRadius:2}}>
           <h2>Agregar estudiante</h2>
            <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Apellido"
                value={surname}
                onChange={(e) => SetSurname(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
             <TextField
                label="Número documento"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
             <TextField
                label="Telefono"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Box>
                <Button variant="contained" onClick={handleAdd}>Agregar</Button>
                <Button sx={{margin:2 }} variant="contained" onClick={handleClose}>Cerrar</Button>
            </Box>
        </Box>
    </Modal>
  );
};

export default ModalAddStudent;