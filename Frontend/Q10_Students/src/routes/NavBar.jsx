import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  const token = sessionStorage.getItem('token');

  const logout =()=>{
    sessionStorage.removeItem('token');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Q10
          </Typography>
          <div>
            <Button href={`/`} color="inherit">Inicio</Button>
            {token ? 
            (
              <>
                <Button href={`/users`} color="inherit">Usuarios</Button>
                <Button href={`/students`} color="inherit">Estudiantes</Button>
                <Button href={`/subjects`} color="inherit">Materias</Button>
                <Button onClick={()=>(logout())} href={`/`} color="inherit">Salir</Button>
              </>
            )
            : 
            (
              <>
                <Button href={`/login`} color="inherit">Login</Button>
              </>
            )
            }
           
           
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
