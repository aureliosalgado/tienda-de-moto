import React, { useEffect, useState } from 'react';

const TestConnection = () => {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios/test');
        const data = await response.json();
        if (data.success) {
          setResponseMessage(data.message);
        } else {
          setResponseMessage('Error en la comunicación con el backend');
        }
      } catch (error) {
        setResponseMessage('Error de conexión: ' + error.message);
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h1>Comprobación de Conexión</h1>
      <p>{responseMessage}</p>
    </div>
  );
};

export default TestConnection;
