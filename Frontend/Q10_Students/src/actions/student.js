import axios from 'axios';
import Swal from 'sweetalert2';

const token = sessionStorage.getItem('token');

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`http://localhost:3000/student`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) 
    {
        console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleAdd= async (name, surname, documentNumber, telephone) => {
    try {
        const response = await axios.post('http://localhost:3000/student/create', { name, surname, documentNumber, telephone }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 201) {
            Swal.fire("Agregado","El estudiante ha sido agregado satisfactoriamente","success");
        } 
        else  {
            Swal.fire("Error", "Hubo un error al agregar el estudiante, intenta nuevamente", "error");
        }
    } catch (error) 
    {
        Swal.fire("Error", "Hubo un error al agregar el estudiante, intenta nuevamente", "error");
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};