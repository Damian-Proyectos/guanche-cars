const VehicleModel = require('../models/vehicleModels');

const vehicleController = {
    // 1. Obtener todos los vehículos
    getAllVehicles: async (req, res) => {
        try {
            const vehicles = await VehicleModel.getAll();
            res.json(vehicles);
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
            res.status(500).json({ message: 'Error del servidor al recibir los datos' });
        }
    },

    // 2. Obtener un vehículo específico por ID
    getVehicleById: async (req, res) => {
        try {
            const { id } = req.params;
            const vehicle = await VehicleModel.getById(id);
            
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            
            res.json(vehicle);
        } catch (error) {
            console.error('Error al obtener el vehículo:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },

    // 3. Crear un nuevo vehículo
    createVehicle: async (req, res) => {
        try {
            const newId = await VehicleModel.create(req.body);
            res.status(201).json({
                message: 'Vehículo registrado exitosamente',
                id: newId
            });
        } catch (error) {
            console.error('Error al crear el vehículo:', error);
            res.status(500).json({ message: 'Error al guardar el vehículo' });
        }
    },

    // 4. Actualizar un vehículo existente
    updateVehicle: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await VehicleModel.update(id, req.body);
            
            if (!updated) {
                return res.status(404).json({ message: 'Vehículo no encontrado o no actualizado' });
            }
            
            res.json({ message: 'Vehículo actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el vehículo:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },

    // 5. Eliminar un vehículo
    deleteVehicle: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await VehicleModel.delete(id);
            
            if (!deleted) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            
            res.json({ message: 'Vehículo eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el vehículo:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
};

module.exports = vehicleController;