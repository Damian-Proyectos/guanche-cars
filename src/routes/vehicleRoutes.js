const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// 1. GET /api/vehicles -> Obtener todos los vehículos
router.get('/', vehicleController.getAllVehicles);

// 2. GET /api/vehicles/:id -> Obtener un vehículo por ID
router.get('/:id', vehicleController.getVehicleById);

// 3. POST /api/vehicles -> Crear un nuevo vehículo
router.post('/', vehicleController.createVehicle);

// 4. PUT /api/vehicles/:id -> Actualizar un vehículo
router.put('/:id', vehicleController.updateVehicle);

// 5. DELETE /api/vehicles/:id -> Eliminar un vehículo
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;