
const generateTelemetry = (deviceId) => {
    // Validate device identification
    if (!deviceId || typeof deviceId !== "string") {
        throw new Error("Valid device ID is required");
    }

    // Generate simulated sensor readings
    const temperature = Number(
        (20 + Math.random() * 70).toFixed(2)
    );

    const humidity = Number(
        (30 + Math.random() * 60).toFixed(2)
    );

    const pressure = Number(
        (20 + Math.random() * 30).toFixed(2)
    );

    // Create structured telemetry object
    const telemetry = {
        deviceId,
        temperature,
        humidity,
        pressure,
        timestamp: new Date().toISOString()
    };

    return telemetry;
};

module.exports = generateTelemetry;
