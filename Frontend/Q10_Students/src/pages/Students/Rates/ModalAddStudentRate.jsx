import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { handleSearch } from '../../../actions/subject.js';

const ModalAddStudentRate = ({ studentId, open, handleClose, AddRate }) => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [rate, setRate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({
    subject: '',
    rate: '',
    notes: ''
  });

  useEffect(() => {
    if (open) {
      getSubjects();
    }
  }, [open]);

  const getSubjects = async () => {
    try {
      const response = await handleSearch();
      setAllSubjects(response);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const handleAdd = () => {
    let newErrors = { subject: '', notes: '', rate: '' };

    const numericRate = parseFloat(rate);

    if (!subject) {
      newErrors.subject = 'Selecciona una asignatura';
    }

    if (!notes.trim()) {
      newErrors.notes = 'El campo no puede estar vacío';
    }

    if (isNaN(numericRate)) {
      newErrors.rate = 'Ingresa una nota válida';
    } else if (numericRate < 0 || numericRate > 5) {
      newErrors.rate = 'La nota debe estar entre 0 y 5';
    }

    setErrors(newErrors);

    if (!newErrors.subject && !newErrors.notes && !newErrors.rate) {
      AddRate(studentId, subject, numericRate, notes);
      closeModal();
    }
  };

  const closeModal = () => {
    setSubject('');
    setRate('');
    setNotes('');
    setErrors({ subject: '', notes: '', rate: '' });
    handleClose();
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 420,
          bgcolor: '#ffffff',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          p: 4
        }}
      >
        {/* TITLE */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Agregar nota
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Registra una nueva calificación
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* FORM */}
        <Box display="flex" flexDirection="column" gap={2}>
          
          {/* SUBJECT */}
          <FormControl fullWidth size="small" error={!!errors.subject}>
            <InputLabel>Asignatura</InputLabel>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Asignatura"
            >
              {allSubjects.map((s) => (
                <MenuItem key={s.id} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.subject}</FormHelperText>
          </FormControl>

          {/* RATE */}
          <TextField
            label="Nota"
            type="number"
            size="small"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            error={!!errors.rate}
            helperText={errors.rate}
          />

          {/* NOTES */}
          <TextField
            label="Comentarios"
            size="small"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={3}
            error={!!errors.notes}
            helperText={errors.notes}
          />
        </Box>

        {/* ACTIONS */}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button
            onClick={closeModal}
            sx={{
              textTransform: 'none',
              color: '#64748b'
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' }
            }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddStudentRate;