
const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parameter: {
        type: String,
        enum: ["temperature", "humidity", "pressure"],
        required: true
    },
    operator: {
        type: String,
        enum: [">", "<", ">=", "<=", "=="],
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Rule", ruleSchema);
