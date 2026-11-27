const Rule = require("../models/Rule");

// Create a new monitoring rule
const createRule = async (req, res) => {
    try {
        const { name, parameter, operator, threshold, severity, enabled } = req.body;

        if (!name || !parameter || !operator || threshold === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, parameter, operator and threshold are required"
            });
        }

        const rule = await Rule.create({
            name,
            parameter,
            operator,
            threshold,
            severity,
            enabled
        });

        res.status(201).json({
            success: true,
            message: "Monitoring rule created successfully",
            data: rule
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create monitoring rule",
            error: error.message
        });
    }
};

// Retrieve all monitoring rules
const getRules = async (req, res) => {
    try {
        const rules = await Rule.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rules.length,
            data: rules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve monitoring rules",
            error: error.message
        });
    }
};

// Update an existing monitoring rule
const updateRule = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "parameter",
            "operator",
            "threshold",
            "severity",
            "enabled"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one valid field to update"
            });
        }

        const rule = await Rule.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: "Monitoring rule not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Monitoring rule updated successfully",
            data: rule
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update monitoring rule",
            error: error.message
        });
    }
};

// Delete a monitoring rule
const deleteRule = async (req, res) => {
    try {
        const rule = await Rule.findByIdAndDelete(req.params.id);

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: "Monitoring rule not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Monitoring rule deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete monitoring rule",
            error: error.message
        });
    }
};

module.exports = {
    createRule,
    getRules,
    updateRule,
    deleteRule
};