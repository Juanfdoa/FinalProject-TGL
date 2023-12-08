import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { StartSession } from '../../actions/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import '../../../style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await StartSession(email, password);
      if(response.status == 200){
        sessionStorage.setItem('token', response.data);
        navigate('/');
      }
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 2,width:400, borderRadius:2}}>
      <Card>
        <CardContent>
          <h1 className='subtitle'>Login</h1>
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default Login;
