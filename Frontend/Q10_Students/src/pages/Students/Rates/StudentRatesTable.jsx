import React, { useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalAddStudentRate from './ModalAddStudentRate';

export default function StudentRatesTable({studentId, data, deleteRate, AddRate }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

const getTextColor = (rate) => {
  return rate < 3.0 ? 'red' : 'green'; 
};

const handleDelete = (id) => {
  deleteRate(id);
};

  return (
  <TableContainer component={Paper}>
    <Box sx={{display: 'flex',justifyContent: 'center',}}>
      <Box sx={{ maxHeight: 280, width: 800, overflow: 'auto', border: 'solid', borderRadius: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Asignatura</TableCell>
              <TableCell align="center">Nota</TableCell>
              <TableCell align="center">Comentarios</TableCell>
              <TableCell align="center">---</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.subject}</TableCell>
                <TableCell align="center">
                  <span style={{ color: getTextColor(row.rate) }}>{row.rate}</span>
                </TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell align="center">
                  <Button size='small' onClick={() => handleDelete(row.id)} variant="outlined" startIcon={<DeleteIcon />}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Button onClick={handleOpenModal} size='small' variant="outlined" startIcon={<AddIcon />}>
                  Agregar nota
                </Button>
                <ModalAddStudentRate studentId={studentId} open={openModal} handleClose={handleCloseModal} AddRate={AddRate}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  </TableContainer>
  );
}
