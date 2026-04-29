import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalAddStudentRate from './ModalAddStudentRate';

export default function StudentRatesTable({ studentId, data, deleteRate, AddRate }) {
  const [openModal, setOpenModal] = useState(false);

  const getColor = (rate) => {
    return rate < 3 ? '#ef4444' : '#22c55e';
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      {/* HEADER ACTION */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography fontWeight="bold">
          Notas del estudiante
        </Typography>

        <Button
          onClick={() => setOpenModal(true)}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            backgroundColor: '#2563eb',
            '&:hover': { backgroundColor: '#1d4ed8' }
          }}
        >
          Agregar nota
        </Button>
      </Box>

      <Table stickyHeader>
        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
            <TableCell align="center"><b>Asignatura</b></TableCell>
            <TableCell align="center"><b>Nota</b></TableCell>
            <TableCell align="center"><b>Comentarios</b></TableCell>
            <TableCell align="center"><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                '&:hover': { backgroundColor: '#f8fafc' }
              }}
            >
              <TableCell>{row.subject}</TableCell>

              <TableCell align="center">
                <Typography fontWeight="bold" sx={{ color: getColor(row.rate) }}>
                  {row.rate}
                </Typography>
              </TableCell>

              <TableCell sx={{ color: '#475569' }}>
                {row.notes || '—'}
              </TableCell>

              <TableCell align="center">
                <Button
                  size="small"
                  onClick={() => deleteRate(row.id)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    textTransform: 'none',
                    color: '#ef4444',
                    '&:hover': { backgroundColor: '#fee2e2' }
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* EMPTY STATE */}
          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography sx={{ color: '#64748b' }}>
                  No hay notas registradas
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* MODAL */}
      <ModalAddStudentRate
        studentId={studentId}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        AddRate={AddRate}
      />
    </TableContainer>
  );
}