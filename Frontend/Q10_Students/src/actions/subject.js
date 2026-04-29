import axios from 'axios';
import { alert, confirm } from "../utils/alerts";
import { apiUrl } from './constants';

const token = sessionStorage.getItem('token');
export const handleSearch = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/v1/subjects`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data?.data;

    } catch (error) {
        console.error('Error en la solicitud:', error?.response?.data);
        alert({title: "Error",text: "Error al obtener las materias",icon: "error"});
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

        await axios.delete(`${apiUrl}/api/v1/subjects/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        alert({title: "Eliminado",text: "La materia ha sido eliminada",icon: "success"});

    } catch (error) {
        console.error('Error al eliminar la materia:', error?.response?.data);
        alert({title: "Error",text: "Error al eliminar la materia",icon: "error"});
    }
};

export const handleAdd = async (name, teacher) => {
    try {
        const response = await axios.post(
            `${apiUrl}/api/v1/subjects`,
            { name, teacher },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 201) {
            alert({title: "Agregado",text: "La materia ha sido agregada correctamente",icon: "success"});
        } else {
            alert({title: "Error",text: "No se pudo agregar la materia",icon: "error"});
        }

    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error?.response?.data);
        alert({title: "Error",text: "Hubo un error al agregar la materia",icon: "error"});
    }
};

export const handleUpdate = async (id, name, teacher) => {
    try {
        const response = await axios.put(
            `${apiUrl}/api/v1/subjects/${id}`,
            { name, teacher },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            alert({title: "Actualizado",text: "La materia ha sido actualizada correctamente",icon: "success"});
        } else {
            alert({title: "Error",text: "No se pudo actualizar la materia",icon: "error"});
        }

    } catch (error) {
        console.error('Error al realizar la solicitud PUT:', error?.response?.data);
        alert({title: "Error",text: "Hubo un error al actualizar la materia",icon: "error"});
    }
};