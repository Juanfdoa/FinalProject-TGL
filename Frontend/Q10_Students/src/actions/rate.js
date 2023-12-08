import axios from 'axios';

export const handleSearch = async (id) => {
    try 
    {
      const response = await axios.get(`http://localhost:3000/rates/${id}`);
      return(response.data);
    } 
    catch (error) 
    {
      console.error('Error en la solicitud:', error.response.data);
    }
};

export const handleDelete = async (id) => {
    try 
    {
      await axios.delete(`http://localhost:3000/rates/delete/${id}`);
      alert("Nota eliminada")
    } 
    catch (error) 
    {
      console.error('Error al eliminar la nota:', error.response.data);
    }
};

export const handleAdd = async (studentId,subject, rate, notes) => {
    try 
    {
      const response = await axios.post('http://localhost:3000/rates/create', {studentId,subject, rate, notes }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Nota agregada');
        handleSearch(); 
      } else {
        alert('Hubo un error, intenta nuevamente');
      }
    } 
    catch (error) 
    {
      console.error('Error al realizar la solicitud POST:', error);
    }
};