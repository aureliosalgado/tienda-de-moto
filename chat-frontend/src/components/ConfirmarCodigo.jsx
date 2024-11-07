import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const ConfirmCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para verificar el código
    if (code === '123456') { // Ejemplo de verificación
      navigate('/motocatalog');
    } else {
      alert('Código incorrecto, por favor intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Confirmar Código</h2>
        <p>Por favor ingresa el código que te hemos enviado.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código de Confirmación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">Confirmar</button>
        </form>
        <p>¿No recibiste el código? <Link to="/resend-code">Reenviar código</Link></p>
      </div>
      <div className="register-graphic">
        {/* Aquí puedes agregar una imagen relacionada */}
      </div>
    </div>
  );
};

export default ConfirmCode;
