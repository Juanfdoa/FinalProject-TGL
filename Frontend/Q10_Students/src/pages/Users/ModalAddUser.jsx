import React, { useState} from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalAddUser = ({ open, handleClose, handleAddUser }) => { 
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleAdd = () => {
    handleAddUser(email,password);
    setEmail('');
    setPassword('');
    handleClose();
};

return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,maxWidth: 900,minWidth: 300, borderRadius:2}}>
           <h2>Agregar usuario</h2>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
               
            />
            <TextField
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
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

export default ModalAddUser;