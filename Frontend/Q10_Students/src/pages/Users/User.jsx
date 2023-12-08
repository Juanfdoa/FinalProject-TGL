import React, { useState, useEffect } from 'react';
import { handleSearch, handleDelete, handleAdd } from '../../actions/user.js';
import UserTable from './UserTable.jsx';
import ModalAddUser from './ModalAddUser.jsx';
import Button from '@mui/material/Button';
import '../../../style.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  const getUsers = async () => {
    try 
    {
      const response = await handleSearch();
      setUsers(response);
    } 
    catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const deleteUser = async (email) => {
    try 
    {
      await handleDelete(email);
      getUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.response.data);
    }
  };

  const AddUser = async (email,password) => {
    try {
      await handleAdd(email,password);
      getUsers();
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  useEffect(() => {   
    getUsers(); 
  }, []);  

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin:5 }}>
        <h2>Usuarios</h2>
          <Button variant="contained" onClick={handleOpenModal}>
            Agregar usuario
          </Button>
          <ModalAddUser open={openModal} handleClose={handleCloseModal} handleAddUser={AddUser}/>
      </div>
      <div>
        <UserTable data={users} deleteUser={deleteUser} />
      </div>
    </>
  );
};

export default User;