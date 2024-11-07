const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioController'); // Asegúrate de que la ruta sea correcta


// Ruta para registro
router.post('/register', usuarioController.register); // Asegúrate de que esto sea correcto

// Ruta para login
router.post('/login', usuarioController.login); // Asegúrate de que esto sea correcto
// En usuarioRoutes.js
//router.get('/test', (req, res) => {
//    res.json({ success: true, message: 'Conexión exitosa con el backend' }); 
//});
module.exports = router;
