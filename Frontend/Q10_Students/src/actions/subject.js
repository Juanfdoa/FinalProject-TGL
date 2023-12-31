import axios from 'axios';
import Swal from 'sweetalert2';
import { apiUrl } from './constants';

const token = sessionStorage.getItem('token');
export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`${apiUrl}/subject`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } 
    catch (error) 
    {
        console.error('Error en la solicitud:', error.response.data);
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
            await axios.delete(`${apiUrl}/subject/delete/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            Swal.fire("Eliminado!","El registro ha sido eliminado","success");
        } else {
            Swal.fire("Cancelado", "Tu registro esta seguro :)", "info");
        }
    } catch (error) {
        Swal.fire("Error", "Error al eliminar la materia", "error");
        console.error('Error al eliminar la materia:', error.response.data);
    }
};

export const handleAdd = async (name,teacher) => {
    try 
    {
        const response = await axios.post(`${apiUrl}/subject/create`, { name, teacher }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 201) {
            Swal.fire("Agregado","La materia ha sido agregada satisfactoriamente","success");
        } else 
        {
            Swal.fire("Error", "Hubo un error al agregar la materia, intenta nuevamente", "error");
        }
    } catch (error) 
    {
        Swal.fire("Error", "Hubo un error al agregar la materia, intenta nuevamente", "error");
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};

export const handleUpdate = async (id,name,teacher) => {
    try 
    {
        const response = await axios.put(`${apiUrl}/subject/update`, { id, name, teacher }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            Swal.fire("Actualizado","La materia ha sido actualizada satisfactoriamente","success");
        } else 
        {
            Swal.fire("Error", "Hubo un error al actualizar la materia, intenta nuevamente", "error");
        }
    } catch (error) 
    {
        Swal.fire("Error", "Hubo un error al actualizar la materia, intenta nuevamente", "error");
        console.error('Error al realizar la solicitud PUT:', error.response.data);
    }
};