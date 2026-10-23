const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar las rutas de vehículos
const vehicleRoutes = require('./routes/vehicleRoutes');

// Inicializar la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json()); // Permite a la app leer datos en formato JSON

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ 
        mensaje: "¡Bienvenido a la API de Guanche Cars!", 
        estado: "Servidor funcionando correctamente 🚀" 
    });
});

// Rutas de la API (Endpoints)
app.use('/api/vehicles', vehicleRoutes);

// Poner el servidor a escuchar peticiones
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});
