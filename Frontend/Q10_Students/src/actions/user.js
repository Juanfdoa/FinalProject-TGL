import axios from 'axios';
import Swal from 'sweetalert2';

const token = sessionStorage.getItem('token');

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`http://localhost:3000/user` , {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } 
    catch (error) {
        console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleDelete = async (email) => {
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
            await axios.delete(`http://localhost:3000/user/${email}` , {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            Swal.fire("Eliminado!","El registro ha sido eliminado","success");
        } else {
            Swal.fire("Cancelado", "Tu registro esta seguro :)", "info");
        }
    } catch (error) {
        Swal.fire("Error", "Error al eliminar el usuario", "error");
        console.error('Error al eliminar el usuario:', error.response.data);
    }
};

export const handleAdd = async (email,password) => {
    try {
        const response = await axios.post('http://localhost:3000/user/create', { email, password }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 201) {
            Swal.fire("Agregado","El usuario ha sido agregado satisfactoriamente","success");
        } 
        else {
            Swal.fire("Error", "Hubo un error al agregar el usuario, intenta nuevamente", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Hubo un error al agregar el usuario, intenta nuevamente", "error");
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};