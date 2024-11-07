<?php
$host = 'localhost';
$username = 'usuario1';
$password = 'admin';
$dbname = 'tienda_moto';

// Archivo donde se guardará el respaldo
$backupFile = 'respaldobd.sql';

// Conexión a MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener todas las tablas de la base de datos
$tables = $conn->query("SHOW TABLES");
$sqlDump = "";

while ($row = $tables->fetch_row()) {
    $table = $row[0];
    $createTable = $conn->query("SHOW CREATE TABLE $table")->fetch_row()[1] . ";\n";
    $sqlDump .= $createTable;

    $data = $conn->query("SELECT * FROM $table");
    while ($dataRow = $data->fetch_assoc()) {
        $values = array_map([$conn, 'real_escape_string'], array_values($dataRow));
        $valuesList = "'" . implode("','", $values) . "'";
        $sqlDump .= "INSERT INTO $table VALUES ($valuesList);\n";
    }
    $sqlDump .= "\n";
}

// Guardar el contenido en un archivo SQL
file_put_contents($backupFile, $sqlDump);
echo "Respaldo completado exitosamente.";

// Cerrar la conexión
$conn->close();
?>
