const Inquiry = require('../models/inquiryModel');

// Obtener todas las solicitudes (para el panel de administración)
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.getAll();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las solicitudes', details: error.message });
    }
};

// Crear una nueva solicitud (desde el formulario de contacto o ficha de coche)
const createInquiry = async (req, res) => {
    try {
        const newInquiryId = await Inquiry.create(req.body);
        res.status(201).json({ message: 'Solicitud enviada con éxito', id: newInquiryId });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar la solicitud', details: error.message });
    }
};

// Actualizar el estado de una solicitud por su ID
const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;     // Cogemos el ID de la URL (ej: /api/inquiries/5/status)
        const { status } = req.body;   // Cogemos el nuevo estado del cuerpo de la petición

        // Llamamos al modelo para que actualice la base de datos
        const affectedRows = await Inquiry.updateStatus(id, status);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        res.json({ message: 'Estado de la solicitud actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado', details: error.message });
    }
};

module.exports = {
    getAllInquiries,
    createInquiry,
    updateInquiryStatus
};