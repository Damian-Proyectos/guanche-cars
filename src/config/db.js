/* pool.promise() nos permite usar las sintaxis moderna del JavaScript (async/await) en nuestros modelos en lugar de antiguos callbacks anidados.
   module.exports = prosimePool; Exporta la conexión configurada para que podamos reutilizarla en vehicleModels.js sin tener que reconectarnos a la base de datos cada vez.    
*/ 

const mysql = require('mysql2');
require('dotenv').config();

// Crear el pool de conexiones usando las variables cargadas desde el .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir las consultas a Promesas para trabajar con async/await de forma limpia
const promisePool = pool.promise();

// Comprobación rápida de la conexión al arrancar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar con la Base de Datos MySQL:', err.message);
    } else {
        console.log('✅ Conexión establecida correctamente con guanche_cars_db');
        connection.release();
    }
});

module.exports = promisePool;

