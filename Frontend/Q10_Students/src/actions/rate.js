import axios from 'axios';
import Swal from 'sweetalert2';

const token = sessionStorage.getItem('token');

export const handleSearch = async (id) => {
    try 
    {
      const response = await axios.get(`http://localhost:3000/rates/${id}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
      return(response.data);
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
        await axios.delete(`http://localhost:3000/rates/delete/${id}`, {
          headers:{
              'Authorization': `Bearer ${token}`
          }
      });
        Swal.fire("Eliminado!","El registro ha sido eliminado","success");
    } else {
        Swal.fire("Cancelado", "Tu registro esta seguro :)", "info");
    }
  } catch (error) {
      Swal.fire("Error", "Error al eliminar la nota", "error");
      console.error('Error al eliminar la nota:', error.response.data);
  }
};

export const handleAdd = async (studentId,subject, rate, notes) => {
    try {
      const response = await axios.post('http://localhost:3000/rates/create', {studentId,subject, rate, notes }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        Swal.fire("Agregado","la nota ha sido agregada satisfactoriamente","success");
      } else {
        Swal.fire("Error", "Hubo un error al agregar la nota, intenta nuevamente", "error");
      }
    } 
    catch (error) 
    {
      Swal.fire("Error", "Hubo un error al agregar la nota, intenta nuevamente", "error");
      console.error('Error al realizar la solicitud POST:', error);
    }
};