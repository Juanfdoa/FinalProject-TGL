import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartSession } from '../../actions/auth';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Typography
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await StartSession(email, password);
      if (response.status === 200) {
        sessionStorage.setItem('token', response?.data?.data?.token);
        console.log(response?.data?.data?.token)
        navigate('/');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          
          {/* TITLE */}
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={1}
            sx={{ color: '#1e293b' }}
          >
            Iniciar sesión
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: '#64748b', mb: 3 }}
          >
            Ingresa tus credenciales para continuar
          </Typography>

          {/* FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              required
              data-cy="input-email"
              label="Email"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              data-cy="input-password"
              label="Contraseña"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <Button
              type="submit"
              data-cy="button-login"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                textTransform: 'none',
                borderRadius: 2,
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
            >
              Iniciar sesión
            </Button>
          </Box>

          {/* BACK */}
          <Box mt={3} textAlign="center">
            <Button
              href="/"
              sx={{
                textTransform: 'none',
                color: '#64748b'
              }}
            >
              Volver al inicio
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;