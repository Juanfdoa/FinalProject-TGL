import axios from 'axios';

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`http://localhost:3000/subject`);
        return response.data;
    } 
    catch (error) 
    {
        console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleDelete = async (id) => {
    try 
    {
        await axios.delete(`http://localhost:3000/subject/delete/${id}`);
    } catch (error) 
    {
        console.error('Error al eliminar la materia:', error.response.data);
    }
};

export const handleAdd = async (name,teacher) => {
    try 
    {
        const response = await axios.post('http://localhost:3000/subject/create', { name, teacher }, 
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert('Materia agregada');
        } else 
        {
            alert('Hubo un error, intenta nuevamente');
        }
    } catch (error) 
    {
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};