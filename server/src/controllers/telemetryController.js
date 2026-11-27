const Telemetry = require("../models/Telemetry");
const Device = require("../models/Device");

// Store incoming telemetry data
const createTelemetry = async (req, res) => {
    try {
        const { deviceId, temperature, humidity, pressure } = req.body;

        const device = await Device.findOne({ deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Registered device not found"
            });
        }

        const telemetry = await Telemetry.create({
            deviceId,
            temperature,
            humidity,
            pressure
        });

        res.status(201).json({
            success: true,
            message: "Telemetry saved successfully",
            data: telemetry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to save telemetry",
            error: error.message
        });
    }
};

// Retrieve the latest telemetry records
const getTelemetry = async (req, res) => {
    try {
        const limit = Math.min(
            Math.max(parseInt(req.query.limit, 10) || 50, 1),
            200
        );

        const records = await Telemetry.find()
            .sort({ timestamp: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve telemetry",
            error: error.message
        });
    }
};

// Retrieve telemetry belonging to one device
const getDeviceTelemetry = async (req, res) => {
    try {
        const limit = Math.min(
            Math.max(parseInt(req.query.limit, 10) || 50, 1),
            200
        );

        const records = await Telemetry.find({
            deviceId: req.params.deviceId
        })
            .sort({ timestamp: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve device telemetry",
            error: error.message
        });
    }
};

module.exports = {
    createTelemetry,
    getTelemetry,
    getDeviceTelemetry
};