import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const ModalAddUser = ({ open, handleClose, handleAddUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!form.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    handleAddUser(form.email, form.password);
    closeModal();
  };

  const closeModal = () => {
    setForm({ email: '', password: '' });
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
          Agregar usuario
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Crea un nuevo usuario en el sistema
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* FORM */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            size="small"
            value={form.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            size="small"
            value={form.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
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

export default ModalAddUser;