const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

// Rutas para las solicitudes
router.get('/', inquiryController.getAllInquiries);
router.post('/', inquiryController.createInquiry);
router.patch('/:id/status', inquiryController.updateInquiryStatus); // La colocamos aquí arriba

module.exports = router;