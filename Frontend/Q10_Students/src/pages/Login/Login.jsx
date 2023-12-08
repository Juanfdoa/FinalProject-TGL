import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import axios from 'axios';
import '../../../style.css';

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('localhost:3000/auth/login', formData);
      console.log('Respuesta del servidor:', response.data);
      // Aquí podrías manejar la respuesta del servidor, como guardar tokens de autenticación, redirigir al usuario, etc.
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Manejo de errores
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardContent>
          <h1 className='subtitle'>
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { mb: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="email"
                name="email"
                label="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained">Login</Button>
            </Box>
          </form>
          <a href='/'>Volver</a>
        </CardContent> 
      </Card>
    </Box>
  );
}
