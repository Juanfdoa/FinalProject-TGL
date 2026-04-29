import axios from 'axios';
import { alert, confirm } from "../utils/alerts";
import { apiUrl } from './constants';

const token = sessionStorage.getItem('token');

export const handleSearch = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/v1/students`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data?.data;

    } catch (error) {
        console.error('Error en la solicitud:', error?.response?.data);
        alert({title: "Error",text: "Error al obtener los estudiantes",icon: "error"});
    }
};

export const handleAdd = async (name, surname, documentNumber, telephone) => {
    try {
        const response = await axios.post(
            `${apiUrl}/api/v1/students`,
            { name, surname, documentNumber, telephone },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 201) {
            alert({title: "Agregado",text: "El estudiante ha sido agregado correctamente",icon: "success"});
        } else {
            alert({title: "Error",text: "No se pudo agregar el estudiante",icon: "error"});
        }

    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error?.response?.data);
        alert({title: "Error",text: "Hubo un error al agregar el estudiante",icon: "error"});
    }
};

export const handleDelete = async (id) => {
    try {
        const confirmation = await confirm({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            confirmButtonText: "Sí, eliminar"
        });

        if (!confirmation.isConfirmed) return;

        await axios.delete(`${apiUrl}/api/v1/students/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        alert({title: "Eliminado",text: "El estudiante ha sido eliminado",icon: "success"});

    } catch (error) {
        console.error('Error al eliminar el estudiante:', error?.response?.data);
        alert({title: "Error",text: "Error al eliminar el estudiante",icon: "error"});
    }
};