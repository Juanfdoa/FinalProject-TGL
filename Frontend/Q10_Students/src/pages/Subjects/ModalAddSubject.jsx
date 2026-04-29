import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const ModalAddSubject = ({ open, handleClose, AddSubject }) => {
  const [form, setForm] = useState({
    name: '',
    teacher: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!form.teacher.trim()) {
      newErrors.teacher = 'El maestro es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    AddSubject(form.name, form.teacher);
    closeModal();
  };

  const closeModal = () => {
    setForm({ name: '', teacher: '' });
    setErrors({});
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
          maxWidth: 400,
          bgcolor: '#ffffff',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          p: 4
        }}
      >
        {/* TITLE */}
        <Typography variant="h6" fontWeight="bold">
          Agregar materia
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Crea una nueva asignatura en el sistema
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* FORM */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre"
            size="small"
            value={form.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Maestro"
            size="small"
            value={form.teacher}
            onChange={handleChange('teacher')}
            error={!!errors.teacher}
            helperText={errors.teacher}
            fullWidth
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

export default ModalAddSubject;