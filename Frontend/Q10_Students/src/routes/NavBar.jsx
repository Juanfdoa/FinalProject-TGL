import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

export default function NavBar() {
  const token = sessionStorage.getItem('token');

  const logout = () => {
    sessionStorage.removeItem('token');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: '#1e293b',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        {/* LOGO */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            cursor: 'pointer',
            color: '#6b707a'
          }}
        >
          Q10
        </Typography>

        {/* MENU */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button href="/" sx={btnStyle}>Inicio</Button>

          {token ? (
            <>
              <Button href="/users" sx={btnStyle}>Usuarios</Button>
              <Button href="/students" sx={btnStyle}>Estudiantes</Button>
              <Button href="/subjects" sx={btnStyle}>Materias</Button>

              <Button
                onClick={logout}
                href="/"
                sx={{
                  ...btnStyle,
                  color: '#ef4444'
                }}
              >
                Salir
              </Button>
            </>
          ) : (
            <Button href="/login" sx={btnStyle}>Login</Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

/* 🎨 Botones estilo claro */
const btnStyle = {
  color: '#475569',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 2,
  px: 2,
  '&:hover': {
    backgroundColor: '#f1f5f9',
    color: '#1e293b'
  }
};