const Vehicle = require('../models/vehicleModels');

// Obtener todos los vehículos
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.getAll();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vehículos', details: error.message });
    }
};

// Obtener vehículo por ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.getById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vehículo', details: error.message });
    }
};

// Crear un vehículo
const createVehicle = async (req, res) => {
    try {
        const newVehicleId = await Vehicle.create(req.body);
        res.status(201).json({ message: 'Vehículo creado con éxito', id: newVehicleId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el vehículo', details: error.message });
    }
};

// Actualizar un vehículo
const updateVehicle = async (req, res) => {
    try {
        const updated = await Vehicle.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Vehículo no encontrado para actualizar' });
        }
        res.json({ message: 'Vehículo actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vehículo', details: error.message });
    }
};

// Eliminar un vehículo
const deleteVehicle = async (req, res) => {
    try {
        const deleted = await Vehicle.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Vehículo no encontrado para eliminar' });
        }
        res.json({ message: 'Vehículo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vehículo', details: error.message });
    }
};

// Buscar vehículos con filtros (marca, precio máximo, isla)
const searchVehicles = async (req, res) => {
    try {
        const { brand, maxPrice, island } = req.query;
        const result = await Vehicle.search({ brand, maxPrice, island });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar vehículos', details: error.message });
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    searchVehicles
};