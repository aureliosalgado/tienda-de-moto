const db = require('../config/db'); // Conexión a la base de datos (asegúrate de que la conexión esté en config/db.js)

// Controlador para agregar una nueva moto
exports.agregarMoto = async (req, res) => {
  const { nombre, descripcion, precio, imagen_url } = req.body;
  try {
    // Convertimos db a una conexión de promesas
    const [result] = await db.promise().query(
      'INSERT INTO motos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, imagen_url]
    );
    res.status(201).json({ message: 'Moto agregada con éxito', motoId: result.insertId });
  } catch (error) {
    console.error('Error al agregar la moto:', error);
    res.status(500).json({ message: 'Error al agregar la moto' });
  }
};

// Controlador para obtener todas las motos
exports.obtenerMotos = async (req, res) => {
  try {
    // Convertimos db a una conexión de promesas
    const [motos] = await db.promise().query('SELECT * FROM motos');
    res.json(motos);
  } catch (error) {
    console.error('Error al obtener las motos:', error);
    res.status(500).json({ message: 'Error al obtener las motos' });
  }
};
