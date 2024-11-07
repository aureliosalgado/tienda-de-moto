import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Por favor acepta los términos y condiciones');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Usuario registrado exitosamente');
        navigate('/confirmarcodigo'); // Redirige al login
      } else {
        setErrorMessage(data.message); // Muestra el error del backend
      }
    } catch (error) {
      setErrorMessage('soy manco');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Regístrate en MotoZone!</h2>
        <p>Tu aventura sobre dos ruedas comienza aquí..</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              Aceptar términos y condiciones
            </label>
          </div>
          <button type="submit" disabled={!termsAccepted}>Registrarse</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link></p>
      </div>
      <div className="register-graphic">
        {/* Puedes agregar contenido adicional aquí */}
      </div>
    </div>
  );
};

export default Register;