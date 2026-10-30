const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// ⚠️ IMPORTANTE: La ruta /search DEBE ir ANTES de /:id para evitar conflictos
router.get('/search', vehicleController.searchVehicles);

// Rutas CRUD estándar
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.post('/', vehicleController.createVehicle);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;