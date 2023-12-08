import React from 'react';
import '../../../style.css';
import NavBar from '../../routes/NavBar';
import Student from './Student';

const StudentContainer = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
       <Student/>
      </div>
    </div>
  );
};

export default StudentContainer;