// controladores/usuarioController.js
const db = require('../config/db'); // Conexión a la base de datos
const bcrypt = require('bcrypt');

// Controlador de registro de usuario
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)';
    
    db.query(query, [nombre, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ success: false, message: 'El correo ya está registrado' });
        }
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};


// Controlador de login de usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  const userQuery = 'SELECT * FROM usuario WHERE email = ?';
  db.query(userQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error en el servidor' });

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no registrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ success: false, message: 'Error en el servidor' });
      if (!isMatch) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

      res.json({ success: true, message: 'Login exitoso' });
    });
  });
};
