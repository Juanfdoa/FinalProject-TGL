import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';

export default function StudentTable({ data }) {

  const getColor = (rate) => {
    return rate < 3
      ? '#ef4444'   // rojo suave
      : '#22c55e';  // verde moderno
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <Box
        sx={{
          maxHeight: 300,
          overflow: 'auto'
        }}
      >
        <Table stickyHeader>
          
          {/* HEADER */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#f1f5f9'
              }}
            >
              <TableCell align="center">
                <Typography fontWeight="bold">Asignatura</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">Nota</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">Comentarios</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: '#f8fafc'
                  }
                }}
              >
                <TableCell>{row.subject}</TableCell>

                <TableCell align="center">
                  <Typography
                    fontWeight="bold"
                    sx={{
                      color: getColor(row.rate)
                    }}
                  >
                    {row.rate}
                  </Typography>
                </TableCell>

                <TableCell sx={{ color: '#475569' }}>
                  {row.notes || '—'}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>
    </TableContainer>
  );
}