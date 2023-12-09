import axios from 'axios';
import Swal from 'sweetalert2';
import { apiUrl } from './constants';

const token = sessionStorage.getItem('token');

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`${apiUrl}/student`, {
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
        const response = await axios.post(`${apiUrl}/student/create`, { name, surname, documentNumber, telephone }, 
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

export const handleDelete = async (id) => {
    try {
        const confirmation = await Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "si, eliminar!"
        });

        if (confirmation.isConfirmed) {
            await axios.delete(`${apiUrl}/student/delete/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            Swal.fire("Eliminado!","El registro ha sido eliminado","success");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            Swal.fire("Cancelado", "Tu registro esta seguro :)", "info");
        }
    } catch (error) {
        Swal.fire("Error", "Error al eliminar el estudiante", "error");
        console.error('Error al eliminar el estudiante:', error.response.data);
    }
};