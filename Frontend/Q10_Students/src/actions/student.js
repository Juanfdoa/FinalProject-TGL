import axios from 'axios';

export const handleSearch = async () => {
    try 
    {
        const response = await axios.get(`http://localhost:3000/student`);
        return response.data;
    } catch (error) 
    {
        console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleAdd= async (name, surname, documentNumber, telephone) => {
    try 
    {
        const response = await axios.post('http://localhost:3000/student/create', { name, surname, documentNumber, telephone }, 
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert('Estudiante agregado');
        } 
        else 
        {
            alert('Hubo un error, intenta nuevamente');
        }
    } catch (error) 
    {
        console.error('Error al realizar la solicitud POST:', error.response.data);
    }
};