import React, { useState, useEffect} from 'react';
import {handleSearch} from '../../../actions/subject.js';
import { Modal, Box, Button } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../../style.css';

const ModalAddStudentRate = ({studentId, open, handleClose, AddRate }) => { 
const [allsubjects, setAllSubjects] = useState([]);
const [subject, setSubject] = useState('');
const [rate, setRate] = useState(0);
const [notes, setNotes] = useState('');
const [errors, setErrors] = useState({
    'subject':'',
    'rate':'',
    'notes':''
});

const getSubjects = async ()=>{
    try 
    {
      const response = await handleSearch();
      setAllSubjects(response);
    } catch (error) 
    {
      console.error('Error en la solicitud:', error.response.data);
    }
  }

const handleAdd = () => {
    let newErrors = { subject:'', notes:'', rate:''};

    if (subject.trim() === '') {
        newErrors.subject = 'El campo no puede estar vacio';
    }

    if (notes.trim() === '') {
        newErrors.notes = 'El campo no puede estar vacio';
    }

    if(rate > 5){
        newErrors.rate = 'La nota no debe ser mayor a 5';
    }

    setErrors(newErrors);

    if (newErrors.subject === '' && newErrors.notes === '' && newErrors.rate ==='') {
        AddRate(studentId,subject,rate,notes);
        closeModal();
    }
};

const closeModal = ()=>{
    setSubject('');
    setRate(0);
    setNotes('');
    setErrors({subject:'', notes:'',rate:''})
    handleClose();
}

useEffect(() => {   
    getSubjects(); 
  }, []);

return (
    <Modal open={open} onClose={closeModal}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,width:500, borderRadius:2}}>
           <h2>Agregar nota</h2>
           <FormControl fullWidth variant="outlined">
            <InputLabel id="subject-label">Asignatura</InputLabel>
                <Select
                    labelId="subject-label"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    label="Asignatura"
                    error={errors.subject !== ''}
                >
                    <MenuItem value="">Seleccionar Asignatura</MenuItem>
                    {allsubjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.name}>
                        {subject.name}
                    </MenuItem>
                    ))}
                </Select>
                {errors.subject && <FormHelperText style={{ color: 'red' }}>{errors.subject}</FormHelperText>}
            </FormControl>
            <TextField
                label="Nota"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                error={errors.rate !== ''}
                helperText={errors.rate} 
            />
             <TextField
                label="Comentarios"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.notes !== ''}
                helperText={errors.notes} 
            />
            <Box>
                <Button variant="contained" onClick={handleAdd}>Agregar</Button>
                <Button sx={{margin:2 }} variant="contained" onClick={closeModal}>Cerrar</Button>
            </Box>
        </Box>
    </Modal>
  );
};

export default ModalAddStudentRate;