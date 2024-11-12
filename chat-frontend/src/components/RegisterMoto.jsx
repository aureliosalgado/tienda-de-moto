// RegisterMoto.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const RegisterMoto = () => {
  const [moto, setMoto] = useState({
    nombre: '',
    imagen_url: '',
    precio: '',
    descripcion: ''
  });
  const [error, setError] = useState(null); // Estado para manejar el error
  const navigate = useNavigate();

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMoto({ ...moto, [name]: value });
  };

  // Envío del formulario
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/moto/agregar', moto);
      navigate('/motocatalog');
    } catch (error) {
      navigate('/motocatalog');
      //console.error('Error al registrar la moto:', error.response || error.message);
      //setError('Error al registrar la moto. Intenta nuevamente.'); // Muestra mensaje de error en caso de excepción
    }
  };

  return (
    <div>
      <Header /> {/* Agrega el Header */}
      <h2>Registrar Nueva Moto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre de la moto"
        value={moto.nombre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="imagen_url"
        placeholder="URL de la imagen"
        value={moto.imagen_url}
        onChange={handleInputChange}
      />
      <input
        type="number"
        step="0.01"
        name="precio"
        placeholder="Precio"
        value={moto.precio}
        onChange={handleInputChange}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={moto.descripcion}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterMoto;