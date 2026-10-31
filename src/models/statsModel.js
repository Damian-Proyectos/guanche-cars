const db = require('../config/db');

const Stats = {
    getOverview: async () => {
        const [totalVehicles] = await db.query('SELECT COUNT(*) as count FROM vehicles');
        const [availableVehicles] = await db.query("SELECT COUNT(*) as count FROM vehicles WHERE status = 'available'");
        const [totalInquiries] = await db.query('SELECT COUNT(*) as count FROM inquiries');
        const [pendingInquiries] = await db.query("SELECT COUNT(*) as count FROM inquiries WHERE status = 'pending'");

        return {
            totalVehicles: totalVehicles[0].count,
            availableVehicles: availableVehicles[0].count,
            totalInquiries: totalInquiries[0].count,
            pendingInquiries: pendingInquiries[0].count
        };
    }
};

module.exports = Stats;