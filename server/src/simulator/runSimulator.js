
const generateTelemetry = require("./generateTelemetry");
const devices = require("./deviceConfig");

// Time between simulation cycles (in milliseconds)
const INTERVAL_MS = 3000;

// Keep track of the running interval
let simulationInterval = null;

// Generate readings for every configured IoT device
const runSimulationCycle = () => {
    console.log("\n================================");
    console.log("      NexusFlow IoT Simulator");
    console.log("================================");

    devices.forEach((deviceId) => {
        try {
            const reading = generateTelemetry(deviceId);

            console.log("\nSensor Reading:");
            console.log(JSON.stringify(reading, null, 2));
        } catch (error) {
            console.error(
                `Error generating data for ${deviceId}:`,
                error.message
            );
        }
    });

    console.log("\nNext readings in 3 seconds...");
};

// Start the continuous simulator
const startSimulation = () => {
    if (simulationInterval) {
        console.log("Simulator is already running.");
        return;
    }

    if (!Array.isArray(devices) || devices.length === 0) {
        throw new Error("No IoT devices are configured.");
    }

    console.log("Starting NexusFlow IoT Simulator...");
    console.log(`Configured devices: ${devices.length}`);
    console.log(`Interval: ${INTERVAL_MS} ms`);

    // Generate the first readings immediately
    runSimulationCycle();

    // Generate new readings every 3 seconds
    simulationInterval = setInterval(
        runSimulationCycle,
        INTERVAL_MS
    );
};

// Stop the simulator safely
const stopSimulation = () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
    }

    console.log("\nNexusFlow IoT Simulator stopped.");
};

// Start the simulator
startSimulation();

// Handle Ctrl + C
process.on("SIGINT", () => {
    stopSimulation();
    process.exit(0);
});
