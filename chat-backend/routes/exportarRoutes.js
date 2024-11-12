const express = require('express');
const router = express.Router();
const exportarController = require('../controladores/exportarController'); // Asegúrate de que la ruta sea correcta


router.get('/archivo', exportarController.exportar); 

module.exports = router;
