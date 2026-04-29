import axios from 'axios';
import { alert, confirm } from "../utils/alerts";
import { apiUrl } from './constants';

const token = sessionStorage.getItem('token');

export const handleSearch = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/rates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data?.data;

  } catch (error) {
    console.error('Error en la solicitud:', error?.response?.data);
    alert({title: "Error",text: "Error al obtener la información de la nota",icon: "error"});
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

    await axios.delete(`${apiUrl}/api/v1/rates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    alert({title: "Eliminado",text: "La nota ha sido eliminada",icon: "success"});

  } catch (error) {
    console.error('Error al eliminar la nota:', error?.response?.data);
    alert({title: "Error", text: "Error al eliminar la nota",icon: "error"});
  }
};

export const handleAdd = async (studentId, subject, rate, notes) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/rates`,
      { studentId, subject, rate, notes },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (response.status === 201) {
      alert({title: "Agregado",text: "La nota ha sido agregada correctamente",icon: "success"});
    } else {
      alert({title: "Error",text: "Hubo un error al agregar la nota",icon: "error"});
    }

  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error?.response?.data);
    alert({title: "Error",text: "Hubo un error al agregar la nota",icon: "error"});
  }
};