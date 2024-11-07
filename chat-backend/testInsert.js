const db = require('./config/db'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');

const testInsert = async () => {
    const nombre = 'testUser';
    const email = 'test@example.com';
    const password = 'testPassword';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)';
        db.query(query, [nombre, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al insertar datos:', err);
            } else {
                console.log('Datos insertados correctamente:', result);
            }
        });
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
};

testInsert();
