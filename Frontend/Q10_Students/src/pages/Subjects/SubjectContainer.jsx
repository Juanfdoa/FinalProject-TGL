import React from 'react';
import '../../../style.css';
import NavBar from '../../routes/NavBar';
import Subject from './subject';

const SubjectContainer = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
       <Subject/>
      </div>
    </div>
  );
};

export default SubjectContainer;