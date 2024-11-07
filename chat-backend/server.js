const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes'); // Importación de las rutas de usuario

const app = express();

// Habilitar CORS para permitir peticiones de otros dominios
app.use(cors());

// Para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Montar las rutas
app.use('/api/usuarios', usuarioRoutes); // Rutas para la API de usuarios

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


