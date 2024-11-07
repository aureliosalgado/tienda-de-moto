<?php
$host = 'localhost';
$username = 'usuario1';
$password = 'admin';
$dbname = 'tienda_moto';

// Crear conexión a MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión a la base de datos exitosa.";
}

// Cerrar la conexión
$conn->close();
?>
