import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function StudentTable({ data }) {
  const getTextColor = (rate) => {
    return rate < 3.0 ? 'red' : 'green'; 
  };

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ maxHeight: 280, width: 800, overflow: 'auto', border:'solid', borderRadius:2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Asignatura</TableCell>
                <TableCell align="center">Nota</TableCell>
                <TableCell align="center">Comentarios</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </TableContainer>
  );
}
