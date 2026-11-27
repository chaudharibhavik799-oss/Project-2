const Device = require("../models/Device");

// Register a new IoT device
const createDevice = async (req, res) => {
    try {
        const { deviceId, deviceName, location, status } = req.body;

        if (!deviceId || !deviceName) {
            return res.status(400).json({
                success: false,
                message: "Device ID and device name are required"
            });
        }

        const existingDevice = await Device.findOne({ deviceId });

        if (existingDevice) {
            return res.status(409).json({
                success: false,
                message: "Device already exists"
            });
        }

        const device = await Device.create({
            deviceId,
            deviceName,
            location,
            status
        });

        res.status(201).json({
            success: true,
            message: "Device registered successfully",
            data: device
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to register device",
            error: error.message
        });
    }
};

// Retrieve all registered devices
const getDevices = async (req, res) => {
    try {
        const devices = await Device.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: devices.length,
            data: devices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve devices",
            error: error.message
        });
    }
};

// Retrieve one device by its device ID
const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findOne({
            deviceId: req.params.deviceId
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        res.status(200).json({
            success: true,
            data: device
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve device",
            error: error.message
        });
    }
};

// Update device information
const updateDevice = async (req, res) => {
    try {
        const device = await Device.findOneAndUpdate(
            { deviceId: req.params.deviceId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Device updated successfully",
            data: device
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update device",
            error: error.message
        });
    }
};

// Delete a registered device
const deleteDevice = async (req, res) => {
    try {
        const device = await Device.findOneAndDelete({
            deviceId: req.params.deviceId
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Device deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete device",
            error: error.message
        });
    }
};

module.exports = {
    createDevice,
    getDevices,
    getDeviceById,
    updateDevice,
    deleteDevice
};