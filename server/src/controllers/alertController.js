const Alert = require("../models/Alert");

// Get all alerts with optional status and severity filters
const getAlerts = async (req, res) => {
    try {
        const filters = {};

        if (req.query.status) {
            filters.status = req.query.status;
        }

        if (req.query.severity) {
            filters.severity = req.query.severity;
        }

        const alerts = await Alert.find(filters).sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve alerts",
            error: error.message
        });
    }
};

// Get alerts for a particular device
const getDeviceAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({
            deviceId: req.params.deviceId
        }).sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve device alerts",
            error: error.message
        });
    }
};

// Mark an alert as resolved
const resolveAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(
            req.params.id,
            { status: "resolved" },
            { new: true, runValidators: true }
        );

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Alert resolved successfully",
            data: alert
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to resolve alert",
            error: error.message
        });
    }
};

module.exports = {
    getAlerts,
    getDeviceAlerts,
    resolveAlert
};