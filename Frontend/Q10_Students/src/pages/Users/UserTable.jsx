import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserTable({ data, deleteUser }) {
  const handleDelete = (email) => {
    deleteUser(email);
  };

  const getUsernameFromEmail = (email) => {
    return email.split('@')[0];
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Icono</strong></TableCell>
            <TableCell align="center"><strong>Email</strong></TableCell>
            <TableCell align="center"><strong>Fecha creación</strong></TableCell>
            <TableCell align="center"><strong>---</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                <img className='circular-image' src={`https://unavatar.io/github/${getUsernameFromEmail(row.email)}`} alt='' />
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleDelete(row.email)} variant="outlined" startIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
