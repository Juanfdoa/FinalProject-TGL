import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import '../style.css';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Router>
          <Route exact path='/' render={() =>  <Home />} />
        </Router>
      </div>
    </div>
  );
};

export default App;
