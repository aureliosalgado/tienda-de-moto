const express = require('express');
const router = express.Router();
const motoController = require('../controladores/motoController'); // Importa el controlador de motos

// Ruta para agregar una moto
router.post('/agregar', motoController.agregarMoto);

// Ruta para obtener todas las motos
router.get('/', motoController.obtenerMotos);

module.exports = router;
