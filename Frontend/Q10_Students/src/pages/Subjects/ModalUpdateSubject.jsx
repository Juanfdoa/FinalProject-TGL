import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../../../style.css';

const ModalUpdateSubject = ({ subjectEdit, open, handleClose, UpdateSubject }) => {
  const [name, setName] = useState(subjectEdit.name || '');
  const [teacher, setTeacher] = useState(subjectEdit.teacher || '');
  const [errors, setErrors] = useState({
    name: '',
    teacher: ''
  });

  const handleUpdate = () => {
    let newErrors = { name: '', teacher: '' };

    if (name.trim() === '') {
      newErrors.name = 'El campo no puede estar vacío';
    }

    if (teacher.trim() === '') {
      newErrors.teacher = 'El campo no puede estar vacío';
    }

    setErrors(newErrors);

    if (newErrors.name === '' && newErrors.teacher === '') {
      UpdateSubject(subjectEdit.id, name, teacher);
      closeModal();
    }
  };

  const closeModal = () => {
    setName(subjectEdit.name || '');
    setTeacher(subjectEdit.teacher || '');
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          maxWidth: 900,
          minWidth: 300,
          borderRadius: 2
        }}
      >
        <h2>Editar Materia</h2>
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
          label="Maestro"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.teacher !== ''}
          helperText={errors.teacher}
        />

        <Box>
          <Button variant="contained" onClick={handleUpdate}>
            Actualizar
          </Button>
          <Button sx={{ margin: 2 }} variant="contained" onClick={closeModal}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdateSubject;
