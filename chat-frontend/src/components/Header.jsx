import React from 'react';
import './Header.css'; // Puedes crear un archivo CSS separado para el estilo del encabezado

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MotoStore</h1> {/* Cambia el texto a lo que quieras mostrar como título */}
      </div>
      <nav className="nav-menu">
        <a href="/">Inicio</a>
        <a href="/catalogo">registrar una moto</a>
        <a href="/contacto">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
