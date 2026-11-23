
/**
 * NexusFlow Telemetry Processing Service
 *
 * Validates and normalizes sensor readings
 * before they are passed to the Rule Engine.
 */

const processTelemetry = (reading) => {
    // Check whether input is a valid object
    if (
        !reading ||
        typeof reading !== "object" ||
        Array.isArray(reading)
    ) {
        throw new Error("Telemetry must be a valid object");
    }

    // Validate device ID
    if (
        typeof reading.deviceId !== "string" ||
        reading.deviceId.trim().length === 0
    ) {
        throw new Error("Valid device ID is required");
    }

    // Validate sensor readings
    const sensorFields = [
        "temperature",
        "humidity",
        "pressure"
    ];

    sensorFields.forEach((field) => {
        if (
            typeof reading[field] !== "number" ||
            !Number.isFinite(reading[field])
        ) {
            throw new Error(`Invalid ${field} reading`);
        }
    });

    // Validate timestamp
    if (
        typeof reading.timestamp !== "string" ||
        Number.isNaN(Date.parse(reading.timestamp))
    ) {
        throw new Error("Invalid telemetry timestamp");
    }

    // Create a clean, normalized telemetry object
    const processedReading = {
        deviceId: reading.deviceId.trim(),
        temperature: Number(reading.temperature),
        humidity: Number(reading.humidity),
        pressure: Number(reading.pressure),
        timestamp: new Date(reading.timestamp).toISOString()
    };

    return processedReading;
};

module.exports = processTelemetry;
