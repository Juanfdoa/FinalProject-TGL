import axios from 'axios';

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`http://localhost:3000/user`);
        return response.data;
    } 
    catch (error) {
        console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleDelete = async (email) => {
    try 
    {
        await axios.delete(`http://localhost:3000/user/${email}`);
    } 
    catch (error) {
        console.error('Error al eliminar el usuario:', error.response.data);
    }
};

export const handleAdd = async (email,password) => {
    try 
    {
        const response = await axios.post('http://localhost:3000/user/create', { email, password }, 
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert('Usuario agregado');
        } 
        else {
            alert('Hubo un error, intenta nuevamente');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};