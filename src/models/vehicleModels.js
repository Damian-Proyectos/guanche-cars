const db = require('../config/db');

const Vehicle = {
    // Obtener todos los vehículos
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM vehicles');
        return rows;
    },

    // Obtener vehículo por ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        return rows[0];
    },

    // Crear un vehículo
    create: async (vehicleData) => {
        const { brand, model, year, price, mileage, fuel, transmission, island, image_url, status } = vehicleData;
        const [result] = await db.query(
            'INSERT INTO vehicles (brand, model, year, price, mileage, fuel, transmission, island, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [brand, model, year, price, mileage, fuel, transmission, island, image_url, status || 'available']
        );
        return result.insertId;
    },

    // Actualizar un vehículo
    update: async (id, vehicleData) => {
        const { brand, model, year, price, mileage, fuel, transmission, island, image_url, status } = vehicleData;
        const [result] = await db.query(
            'UPDATE vehicles SET brand = ?, model = ?, year = ?, price = ?, mileage = ?, fuel = ?, transmission = ?, island = ?, image_url = ?, status = ? WHERE id = ?',
            [brand, model, year, price, mileage, fuel, transmission, island, image_url, status, id]
        );
        return result.affectedRows > 0;
    },

    // Eliminar un vehículo
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    // Buscar vehículos con filtros (marca, precio máximo, isla)
    search: async (filters) => {
        let sql = 'SELECT * FROM vehicles WHERE 1=1';
        const params = [];

        if (filters.brand) {
            sql += ' AND LOWER(brand) LIKE LOWER(?)';
            params.push(`%${filters.brand}%`);
        }

        if (filters.maxPrice) {
            sql += ' AND price <= ?';
            params.push(Number(filters.maxPrice));
        }

        if (filters.island) {
            sql += ' AND LOWER(island) = LOWER(?)';
            params.push(filters.island);
        }

        const [rows] = await db.query(sql, params);
        return rows;
    }
};

module.exports = Vehicle;