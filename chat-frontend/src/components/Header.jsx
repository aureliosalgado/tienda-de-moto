import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  // Función para manejar el clic en el enlace "Exportar"
  const handleExport = async () => {
    try {
      // Realizamos una solicitud GET al servidor para obtener el archivo Excel
      const response = await fetch('http://localhost:5000/api/exportar/archivo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('No se pudo generar el archivo Excel');
      }

      // Crea un objeto Blob con el contenido del archivo
      const blob = await response.blob();

      // Crea una URL para descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'motos.xlsx'; // Nombre del archivo que se descargará

      // Simula un clic en el enlace para descargar el archivo
      link.click();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>MotoStore</h1>
      </div>
      <nav className="nav-menu">
        {/* Condicionales para ocultar enlaces según la ruta actual */}
        {location.pathname !== '/motocatalog' && <a href="/motocatalog">Inicio</a>}
        {location.pathname !== '/registrarmoto' && <a href="/registrarmoto">Registrar</a>}
        {location.pathname !== '/registrarmoto' && <a href="#" onClick={handleExport}>Exportar</a>} {/* Enlace con manejador de clic */}
      </nav>
    </header>
  );
}

export default Header;
