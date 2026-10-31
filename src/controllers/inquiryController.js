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

module.exports = {
    getAllInquiries,
    createInquiry
};