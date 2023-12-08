import React from 'react';
import NavBar from '../../routes/NavBar';
import User from './user';
import '../../../style.css';

const UserContainer = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
       <User/>
      </div>
    </div>
  );
};

export default UserContainer;