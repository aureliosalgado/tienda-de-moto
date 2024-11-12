import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ConfirmarCodigo from './components/ConfirmarCodigo';
import MotoCatalog from './components/MotoCatalog';
import RegisterMoto from './components/RegisterMoto';

const NotFound = () => {
  return <h2>404 -no encontrada</h2>;
};

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmarcodigo" element={<ConfirmarCodigo />} />
        <Route path="/motocatalog" element={<MotoCatalog />} />
        <Route path="/registrarmoto" element={<RegisterMoto />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
