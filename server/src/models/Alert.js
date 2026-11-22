
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    },
    status: {
        type: String,
        enum: ["active", "resolved"],
        default: "active"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);
