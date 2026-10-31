const db = require('../config/db');

const Inquiry = {
    // Obtener todas las solicitudes (con info del coche relacionado si lo hay)
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT inquiries.*, vehicles.brand, vehicles.model 
            FROM inquiries 
            LEFT JOIN vehicles ON inquiries.vehicle_id = vehicles.id 
            ORDER BY inquiries.created_at DESC
        `);
        return rows;
    },

    // Crear una nueva solicitud o mensaje de contacto
    create: async (inquiryData) => {
        const { vehicle_id, name, email, phone, message } = inquiryData;
        const [result] = await db.query(
            'INSERT INTO inquiries (vehicle_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)',
            [vehicle_id || null, name, email, phone || null, message]
        );
        return result.insertId;
    }
};

module.exports = Inquiry;