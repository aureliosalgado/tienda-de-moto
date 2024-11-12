import React, { useEffect, useState } from 'react';
import './MotoCatalog.css';
import Header from './Header';

const MotoCatalog = () => {
  const [motos, setMotos] = useState([]); // Estado para almacenar las motos obtenidas de la API
  const [error, setError] = useState(null);

  // Hook useEffect para obtener los datos de la API
  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/moto/');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setMotos(data); // Actualiza el estado con los datos obtenidos de la API
      } catch (err) {
        console.error('Error al obtener las motos:', err);
        setError('No se pudieron cargar las motos.');
      }
    };

    fetchMotos(); // Llama a la función para obtener los datos
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="catalog-container">
      <Header /> {/* Aquí se incluye el Header */}
      <h1>Catálogo de Motos</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="moto-cards">
          {motos.map((moto) => (
            <div key={moto.id} className="moto-card">
              <img src={moto.imagen_url} alt={moto.nombre} className="moto-image" />
              <h2 className="moto-name">{moto.nombre}</h2>
              <p className="moto-price">{`$${moto.precio}`}</p>
              <p className="moto-description">{moto.descripcion}</p>
              <button className="moto-button">Ver detalles</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MotoCatalog;
