import React from 'react';
import Home from './Home';
import NavBar from '../../routes/NavBar';
import '../../../style.css';

const HomeContainer = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
       <Home/>
      </div>
    </div>
  );
};

export default HomeContainer;