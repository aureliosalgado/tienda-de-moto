<?php
// Configuración de la base de datos
$host = 'localhost';
$username = 'usuario1';
$password = 'admin';
$dbname = 'tienda_moto';

// Archivo SQL a restaurar
$backupFile = 'respaldobd.sql'; // respaldobd

// Conexión a MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if (!$conn->query($sql)) {
    die("Error al crear la base de datos: " . $conn->error);
}

// Seleccionar la base de datos
$conn->select_db($dbname);

// Leer el contenido del archivo SQL
$commands = file_get_contents($backupFile);
if ($commands === false) {
    die("Error al leer el archivo de respaldo.");
}

// Ejecutar los comandos SQL
$backupCommands = explode(";\n", $commands); // Separar por comandos

// Verificar tablas
$needsRestoration = false;

foreach ($backupCommands as $command) {
    if (stripos(trim($command), 'CREATE TABLE') === 0) {
        preg_match('/CREATE TABLE `(.*?)`/', $command, $matches);
        if (isset($matches[1])) {
            $tableName = $matches[1];
            // Verificar si la tabla existe
            $result = $conn->query("SHOW TABLES LIKE '$tableName'");
            if ($result->num_rows === 0) {
                $needsRestoration = true;
                break; // Al menos una tabla falta, no se necesita más comprobación
            }
        }
    }
}

if (!$needsRestoration) {
    echo "La base de datos está bien, no  es necesario hacer el respaldo.";
} else {
    // Si se requiere restaurar, ejecutar los comandos del respaldo
    if (!$conn->multi_query($commands)) {
        die("Error al restaurar la base de datos: " . $conn->error);
    }
    echo "Restauración completada exitosamente.";
}

// Cerrar la conexión
$conn->close();
?>
