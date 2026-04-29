import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserTable({ data, deleteUser }) {

  const getUsernameFromEmail = (email) => email.split('@')[0];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <Table stickyHeader>

        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
            <TableCell align="center"><b>Usuario</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Creación</b></TableCell>
            <TableCell align="center"><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}
            >
              {/* AVATAR + USER */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={`https://unavatar.io/github/${getUsernameFromEmail(row.email)}`}
                  />
                  <Typography fontWeight="500">
                    {getUsernameFromEmail(row.email)}
                  </Typography>
                </Box>
              </TableCell>

              {/* EMAIL */}
              <TableCell align="center">
                {row.email}
              </TableCell>

              {/* DATE */}
              <TableCell align="center">
                {formatDate(row.createdAt)}
              </TableCell>

              {/* ACTION */}
              <TableCell align="center">
                <Button
                  onClick={() => deleteUser(row.id)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    textTransform: 'none',
                    color: '#ef4444',
                    '&:hover': {
                      backgroundColor: '#fee2e2'
                    }
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
                  No hay usuarios registrados
                </Typography>
              </TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </TableContainer>
  );
}