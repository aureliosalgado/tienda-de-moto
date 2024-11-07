import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
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
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirigir al chat si el login es exitoso
        navigate('/motocatalog');
      } else {
        // Mostrar mensaje de error según la respuesta del servidor
        setErrorMessage(data.message || 'Error de autenticación');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Bienvenido a MotoZone</h2>
        <p>Donde la pasión por las motos se encuentra con grandes ofertas.</p>

        <form onSubmit={handleSubmit}>
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

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar error */}

          <button type="submit" disabled={!termsAccepted}>
            Iniciar Sesión
          </button>
        </form>

        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>

      <div className="login-graphic">
        {/* Aquí puedes colocar una imagen de fondo si lo deseas */}
      </div>
    </div>
  );
};

export default Login;