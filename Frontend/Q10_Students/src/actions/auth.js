import axios from 'axios';
import Swal from 'sweetalert2';
import { apiUrl } from './constants';

export const StartSession = async (email, password) => {
  try {
 
    const response = await axios.post(`${apiUrl}/auth/login`, {email, password }, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } 
  catch (error) 
  {
    Swal.fire("Error", "Credenciales invalidas", "error");
    console.error('Error al realizar la solicitud POST:', error);
  }
};