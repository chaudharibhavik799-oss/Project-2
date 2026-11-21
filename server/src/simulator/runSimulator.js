
const generateTelemetry = require("./generateTelemetry");

// List of connected IoT devices
const devices = [
    "DEV001",
    "DEV002",
    "DEV003"
];

// Generate readings for all registered devices
const startSimulation = () => {
    console.log("================================");
    console.log("     NexusFlow IoT Simulator");
    console.log("================================");

    devices.forEach((deviceId) => {
        const reading = generateTelemetry(deviceId);

        console.log("\nSensor Reading Generated:");
        console.log(JSON.stringify(reading, null, 2));
    });

    console.log("\nSimulation completed successfully.");
};

// Start the simulation
startSimulation();
