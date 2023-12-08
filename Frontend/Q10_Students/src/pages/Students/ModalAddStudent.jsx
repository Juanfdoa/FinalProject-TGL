import React, { useState} from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalAddStudent = ({ open, handleClose, AddStudent }) => { 
const [name, setName] = useState('');
const [surname, SetSurname] = useState('');
const [documentNumber, setDocumentNumber] = useState('');
const [telephone, setTelephone] = useState('');
const [errors, setErrors] = useState({
    'name':'',
    'surname':'',
    'documentNumber':'',
    'telephone':''
});

const handleAdd = () => {
    let newErrors = {name:'',surname:'',documentNumber:'', telephone:''}

    if (name.trim() === '') {
        newErrors.name = 'El campo no puede estar vacío';
    }
    if (surname.trim() === '') {
        newErrors.surname = 'El campo no puede estar vacío';
    }
    if (documentNumber.trim() === '') {
        newErrors.documentNumber = 'El campo no puede estar vacío';
    }
    if (telephone.trim() === '') {
        newErrors.telephone = 'El campo no puede estar vacío';
    }

    setErrors(newErrors);

    if (newErrors.name === '' && newErrors.surname === '' && newErrors.documentNumber === '' && newErrors.telephone === '')  {
        AddStudent(name, surname,documentNumber,telephone);
        closeModal();
    }
};

const closeModal = ()=>{
    setName('');
    SetSurname('');
    setDocumentNumber('');
    setTelephone('');
    setErrors({name:'',surname:'',documentNumber:'', telephone:''})
    handleClose();
}

return (
    <Modal open={open} onClose={closeModal}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,maxWidth: 900,minWidth: 300, borderRadius:2}}>
           <h2>Agregar estudiante</h2>
            <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
                error={errors.name !== ''}
                helperText={errors.name} 
            />
            <TextField
                label="Apellido"
                value={surname}
                onChange={(e) => SetSurname(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.surname !== ''}
                helperText={errors.surname} 
            />
             <TextField
                label="Número documento"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.documentNumber !== ''}
                helperText={errors.documentNumber} 
            />
             <TextField
                label="Telefono"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.telephone !== ''}
                helperText={errors.telephone} 
            />
            <Box>
                <Button variant="contained" onClick={handleAdd}>Agregar</Button>
                <Button sx={{margin:2 }} variant="contained" onClick={closeModal}>Cerrar</Button>
            </Box>
        </Box>
    </Modal>
  );
};

export default ModalAddStudent;