const Stats = require('../models/statsModel');

const getStats = async (req, res) => {
    try {
        const stats = await Stats.getOverview();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las estadísticas', details: error.message });
    }
};

module.exports = { getStats };