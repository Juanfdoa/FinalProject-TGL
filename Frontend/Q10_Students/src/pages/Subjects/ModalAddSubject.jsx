import React, { useState} from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalAddSubject = ({ open, handleClose, AddSubject }) => { 
const [name, setName] = useState('');
const [teacher, setTeacher] = useState('');

const handleAdd = () => {
    AddSubject(name,teacher);
    setName('');
    setTeacher('');
    handleClose();
};

return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,maxWidth: 900,minWidth: 300, borderRadius:2}}>
           
           <h2>Agregar Materia</h2>
           
            <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
               
            />
            <TextField
                label="Maestro"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
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

export default ModalAddSubject;