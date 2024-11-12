const db = require('../config/db'); // Conexión a la base de datos
const ExcelJS = require('exceljs'); // Importa exceljs
const axios = require('axios'); // Para hacer peticiones HTTP y descargar imágenes
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises; // Para trabajar con fs de forma asíncrona

const mytemp = "C:\\Users\\Zbook\\Desktop\\chat4\\chat-backend\\temp"; // Asegúrate de escapar correctamente la ruta

// Función para borrar los archivos dentro del directorio temporal
const borrarArchivosTemp = async () => {
    try {
        const files = await fsPromises.readdir(mytemp);
        for (const file of files) {
            const filePath = path.join(mytemp, file);
            await fsPromises.unlink(filePath);
            console.log(`Archivo temporal eliminado: ${filePath}`);
        }
    } catch (error) {
        console.error("Error al borrar los archivos temporales:", error);
    }
};

exports.exportar = async (req, res) => {
    try {
        // Borrar el contenido de la carpeta temporal antes de empezar
        await borrarArchivosTemp();

        // Realiza la consulta a la base de datos
        const [motos] = await db.promise().query('SELECT * FROM motos');

        // Crea un nuevo libro de trabajo y una hoja
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Motos');

        // Agrega el encabezado de las columnas
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 25 },
            { header: 'Descripción', key: 'descripcion', width: 40 },
            { header: 'Precio', key: 'precio', width: 15 },
            { header: 'Imagen', key: 'imagen_url', width: 40 },
        ];

        // Procesa las motos y agrega las filas
        let count = 0;
        for (const moto of motos) {
            // Solo se descargará la imagen si tiene una URL
            if (moto.imagen_url) {
                const imageUrl = moto.imagen_url;
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

                // Usar el contador como sufijo para el nombre del archivo
                count++;
                const imgPath = path.join(mytemp, `temp_image_${count}.jpg`);
                console.log('Ruta de la imagen temporal:', imgPath);

                // Verificar si el directorio temporal existe, si no, crear el directorio
                if (!fs.existsSync(mytemp)) {
                    await fsPromises.mkdir(mytemp, { recursive: true });
                    console.log('Directorio temporal creado:', mytemp);
                }

                // Escribir la imagen en el directorio temporal
                await fsPromises.writeFile(imgPath, imageResponse.data);
                console.log(`Imagen guardada en: ${imgPath}`);

                // Agregar la imagen al Excel
                const imageId = workbook.addImage({
                    filename: imgPath,
                    extension: 'jpeg',
                    buffer: await fsPromises.readFile(imgPath),

                });

                // Agregar la moto sin la imagen URL en el campo texto
                worksheet.addRow({
                    nombre: moto.nombre,
                    descripcion: moto.descripcion,
                    precio: moto.precio,
                    imagen_url: '', // Un texto indicativo
                });

                // Coloca la imagen en la celda correspondiente
                const rowIndex = worksheet.lastRow.number;
                worksheet.addImage(imageId, {
                    tl: { col: 3, row: rowIndex - 1 }, // Posiciona la imagen en la celda D
                    ext: { width: 150, height: 100 },
                    editAs: 'oneCell',
                });

                worksheet.getRow(rowIndex).height = 100; // Ajusta la altura según la imagen

                // No eliminamos la imagen temporal para que persista en la carpeta
                console.log(`Imagen temporal guardada: ${imgPath}`);
            } else {
                worksheet.addRow({
                    nombre: moto.nombre,
                    descripcion: moto.descripcion,
                    precio: moto.precio,
                    imagen_url: imageUrl,
                });
            }
        }

        // Configura el encabezado de la respuesta para enviar el archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=motos.xlsx');

        // Enviar el archivo Excel como respuesta
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al exportar las motos:', error);
        console.error('Detalle del error:', error.stack); // Muestra la línea y el detalle del error
        res.status(500).json({ message: 'Error al exportar las motos', error: error.stack });
    }
};
