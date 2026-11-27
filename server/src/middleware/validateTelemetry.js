// Middleware to validate incoming IoT telemetry data

const validateTelemetry = (req, res, next) => {
    const { deviceId, temperature, humidity, pressure } = req.body || {};

    const errors = [];

    // Check whether the device ID is provided correctly
    if (typeof deviceId !== "string" || deviceId.trim() === "") {
        errors.push("A valid deviceId is required");
    }

    // Validate temperature as a finite numeric value
    if (typeof temperature !== "number" || !Number.isFinite(temperature)) {
        errors.push("Temperature must be a valid number");
    }

    // Validate humidity and ensure it stays within the allowed range
    if (typeof humidity !== "number" || !Number.isFinite(humidity)) {
        errors.push("Humidity must be a valid number");
    } else if (humidity < 0 || humidity > 100) {
        errors.push("Humidity must be between 0 and 100");
    }

    // Validate pressure as a positive numeric value
    if (typeof pressure !== "number" || !Number.isFinite(pressure)) {
        errors.push("Pressure must be a valid number");
    } else if (pressure <= 0) {
        errors.push("Pressure must be greater than zero");
    }

    // Return all validation errors together
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Telemetry validation failed",
            errors
        });
    }

    // Continue to the next middleware or route
    next();
};

module.exports = validateTelemetry;