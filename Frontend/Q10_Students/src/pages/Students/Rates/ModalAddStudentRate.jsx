import React, { useState, useEffect} from 'react';
import {handleSearch} from '../../../actions/subject.js';
import { Modal, Box, Button } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../../style.css';

const ModalAddStudentRate = ({studentId, open, handleClose, AddRate }) => { 
const [allsubjects, setAllSubjects] = useState([]);
const [subject, setSubject] = useState('');
const [rate, setRate] = useState(0);
const [notes, setNotes] = useState('');

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
    AddRate(studentId,subject,rate,notes);
    setSubject('');
    setRate(0);
    setNotes('');
    handleClose();
};

useEffect(() => {   
    getSubjects(); 
  }, []);

return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,maxWidth: 900,minWidth: 300, borderRadius:2}}>
           <h2>Agregar nota</h2>
           <FormControl fullWidth variant="outlined">
            <InputLabel id="subject-label">Asignatura</InputLabel>
                <Select
                    labelId="subject-label"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    label="Asignatura"
                >
                    <MenuItem value="">Seleccionar Asignatura</MenuItem>
                    {allsubjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.name}>
                        {subject.name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Nota"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
            />
             <TextField
                label="Comentarios"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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

export default ModalAddStudentRate;