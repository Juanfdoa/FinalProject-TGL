import React, { useState, useEffect } from 'react';
import { handleSearch, handleDelete, handleAdd } from '../../actions/user.js';

import UserTable from './UserTable.jsx';
import ModalAddUser from './ModalAddUser.jsx';

// 🔥 MUI
import { Box, Button, Typography } from '@mui/material';

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
    {/* HEADER */}
    <Box
      sx={{
        width: '100%',
        mb: 3,
        mt:3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Usuarios
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Administra los usuarios del sistema
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          backgroundColor: '#2563eb',
          '&:hover': { backgroundColor: '#1d4ed8' }
        }}
      >
        Agregar usuario
      </Button>
    </Box>

    {/* CONTENT */}
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      <UserTable
        data={users}
        deleteUser={deleteUser}
      />
    </Box>

    {/* MODAL */}
    <ModalAddUser
      open={openModal}
      handleClose={handleCloseModal}
      handleAddUser={AddUser}
    />
  </>
);
};

export default User;