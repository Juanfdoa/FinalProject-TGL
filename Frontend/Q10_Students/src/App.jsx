import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './routes/NavBar';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <NavBar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;