import axios from 'axios';
import Swal from 'sweetalert2';

export const StartSession = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {email, password }, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } 
  catch (error) 
  {
    Swal.fire("Error", "Credenciales invalidas", "error");
    console.error('Error al realizar la solicitud POST:', error);
  }
};