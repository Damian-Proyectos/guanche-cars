const db = require('../config/db');

const VehicleModel = {
    // 1. Obtener todos los vehículos
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM vehicles ORDER BY id DESC');
        return rows;
    },

    // 2. Obtener un vehículo por su ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        return rows[0]; // Devuelve el primer resultado o undefined
    },

    // 3. Crear un nuevo vehículo
    create: async (vehicleData) => {
        const { brand, model, year, price, mileage, fuel, transmission, island, image_url } = vehicleData;
        const [result] = await db.query(
            `INSERT INTO vehicles (brand, model, year, price, mileage, fuel, transmission, island, image_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [brand, model, year, price, mileage, fuel, transmission, island, image_url]
        );
        return result.insertId;
    },

    // 4. Actualizar un vehículo existente
    update: async (id, vehicleData) => {
        const { brand, model, year, price, mileage, fuel, transmission, island, image_url, status } = vehicleData;
        const [result] = await db.query(
            `UPDATE vehicles 
             SET brand = ?, model = ?, year = ?, price = ?, mileage = ?, fuel = ?, transmission = ?, island = ?, image_url = ?, status = ?
             WHERE id = ?`,
            [brand, model, year, price, mileage, fuel, transmission, island, image_url, status, id]
        );
        return result.affectedRows > 0;
    },

    // 5. Eliminar un vehículo
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = VehicleModel;