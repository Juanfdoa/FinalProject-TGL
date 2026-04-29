import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const ModalAddStudent = ({ open, handleClose, AddStudent }) => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    documentNumber: '',
    telephone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.surname.trim()) newErrors.surname = 'El apellido es obligatorio';

    if (!form.documentNumber.trim()) {
      newErrors.documentNumber = 'El documento es obligatorio';
    } else if (!/^\d+$/.test(form.documentNumber)) {
      newErrors.documentNumber = 'Solo números';
    }

    if (!form.telephone.trim()) {
      newErrors.telephone = 'El teléfono es obligatorio';
    } else if (!/^[0-9]{7,15}$/.test(form.telephone)) {
      newErrors.telephone = 'Teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    AddStudent(
      form.name,
      form.surname,
      form.documentNumber,
      form.telephone
    );

    closeModal();
  };

  const closeModal = () => {
    setForm({
      name: '',
      surname: '',
      documentNumber: '',
      telephone: ''
    });
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
          maxWidth: 420,
          bgcolor: '#ffffff',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          p: 4
        }}
      >
        {/* TITLE */}
        <Typography variant="h6" fontWeight="bold">
          Agregar estudiante
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Completa la información del estudiante
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
            label="Apellido"
            size="small"
            value={form.surname}
            onChange={handleChange('surname')}
            error={!!errors.surname}
            helperText={errors.surname}
            fullWidth
          />

          <TextField
            label="Número de documento"
            size="small"
            value={form.documentNumber}
            onChange={handleChange('documentNumber')}
            error={!!errors.documentNumber}
            helperText={errors.documentNumber}
            fullWidth
          />

          <TextField
            label="Teléfono"
            size="small"
            value={form.telephone}
            onChange={handleChange('telephone')}
            error={!!errors.telephone}
            helperText={errors.telephone}
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

export default ModalAddStudent;