import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ModalUpdateSubject from './ModalUpdateSubject';

export default function SubjectCard({ data, deleteSubject, UpdateSubject }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [subjectEdit, setSubjectEdit] = useState({
    id: '',
    name: '',
    teacher: ''
  });

  const handleDelete = (id) => {
    deleteSubject(id);
  };

  const catchSubject = (id, name, teacher) => {
    setSubjectEdit({ id, name, teacher });
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      {data &&
        data.map((row) => (
          <Card
            key={row.id}
            sx={{
              width: 240,
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: '0.25s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
              }
            }}
          >
            {/* ACTIONS */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
              }}
            >
              <Tooltip title="Editar">
                <IconButton
                  size="small"
                  onClick={() => catchSubject(row.id, row.name, row.teacher)}
                  sx={{ color: '#2563eb' }}
                >
                  <CreateIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(row.id)}
                  sx={{
                    color: '#ef4444',
                    '&:hover': {
                      backgroundColor: '#fee2e2'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ pt: 0 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: '#1e293b' }}
                gutterBottom
              >
                {row.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: '#64748b' }}
              >
                {row.teacher || 'Sin profesor asignado'}
              </Typography>
            </CardContent>
          </Card>
        ))}

      {/* MODAL */}
      <ModalUpdateSubject
        subjectEdit={subjectEdit}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        UpdateSubject={UpdateSubject}
      />
    </Box>
  );
}