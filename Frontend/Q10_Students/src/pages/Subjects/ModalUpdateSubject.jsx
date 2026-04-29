import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const ModalUpdateSubject = ({ subjectEdit, open, handleClose, UpdateSubject }) => {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    teacher: ''
  });

  // 🔥 IMPORTANTE: sincronizar cuando cambia el subject
  useEffect(() => {
    if (subjectEdit) {
      setName(subjectEdit.name || '');
      setTeacher(subjectEdit.teacher || '');
    }
  }, [subjectEdit]);

  const handleUpdate = () => {
    let newErrors = { name: '', teacher: '' };

    if (name.trim() === '') {
      newErrors.name = 'El campo no puede estar vacío';
    }

    if (teacher.trim() === '') {
      newErrors.teacher = 'El campo no puede estar vacío';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.teacher) {
      UpdateSubject(subjectEdit.id, name, teacher);
      closeModal();
    }
  };

  const closeModal = () => {
    setErrors({ name: '', teacher: '' });
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
          Editar materia
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Actualiza la información de la materia
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* FORM */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <TextField
            label="Profesor"
            size="small"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            fullWidth
            error={!!errors.teacher}
            helperText={errors.teacher}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>

        {/* ACTIONS */}
        <Box
          mt={3}
          display="flex"
          justifyContent="flex-end"
          gap={1}
        >
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
            onClick={handleUpdate}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            Actualizar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdateSubject;