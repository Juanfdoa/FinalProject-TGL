import React, { useState} from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalAddUser = ({ open, handleClose, handleAddUser }) => { 
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({
    'email':'',
    'password':''
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleAdd = () => {
    let newErrors = { email: '', password: '' };

    if (!emailRegex.test(email) || email.trim() === '') {
        newErrors.email = 'Por favor, introduce un correo electrónico válido';
    }

    if (password.trim() === '') {
        newErrors.password = 'Por favor, introduce una contraseña';
    }

    setErrors(newErrors);

    if (newErrors.email === '' && newErrors.password === '') {
        handleAddUser(email, password);
        closeModal();
    }
};

const closeModal = ()=>{
    setEmail('');
    setPassword('');
    setErrors({email: '', password: ''});
    handleClose();
}

return (
    <Modal open={open} onClose={closeModal}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,width:500, borderRadius:2}}>
           <h2>Agregar usuario</h2>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                error={errors.email !== ''}
                helperText={errors.email} 
            />
            
            <TextField
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                error={errors.password !== ''}
                helperText={errors.password} 
            />

            <Box>
                <Button variant="contained" onClick={handleAdd}>Agregar</Button>
                <Button sx={{margin:2 }} variant="contained" onClick={closeModal}>Cerrar</Button>
            </Box>
        </Box>
    </Modal>
  );
};

export default ModalAddUser;