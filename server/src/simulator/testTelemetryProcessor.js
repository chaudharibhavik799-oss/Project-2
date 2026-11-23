
const assert = require("assert");
const processTelemetry = require("./telemetryProcessor");

// Sample valid sensor reading
const validReading = {
    deviceId: "DEV001",
    temperature: 35.5,
    humidity: 60,
    pressure: 30,
    timestamp: new Date().toISOString()
};

// Test 1: Process valid telemetry
const result = processTelemetry(validReading);

assert.strictEqual(result.deviceId, "DEV001");
assert.strictEqual(result.temperature, 35.5);
assert.strictEqual(result.humidity, 60);
assert.strictEqual(result.pressure, 30);

console.log("Valid telemetry processing test passed!");

// Test 2: Normalize device ID
const spacedReading = {
    ...validReading,
    deviceId: " DEV002 "
};

const normalized = processTelemetry(spacedReading);

assert.strictEqual(normalized.deviceId, "DEV002");

console.log("Device ID normalization test passed!");

// Test 3: Reject missing device ID
assert.throws(
    () => processTelemetry({
        ...validReading,
        deviceId: ""
    }),
    /Valid device ID/
);

console.log("Missing device ID test passed!");

// Test 4: Reject invalid temperature
assert.throws(
    () => processTelemetry({
        ...validReading,
        temperature: "hot"
    }),
    /Invalid temperature/
);

console.log("Invalid temperature test passed!");

// Test 5: Reject invalid humidity
assert.throws(
    () => processTelemetry({
        ...validReading,
        humidity: NaN
    }),
    /Invalid humidity/
);

console.log("Invalid humidity test passed!");

// Test 6: Reject invalid pressure
assert.throws(
    () => processTelemetry({
        ...validReading,
        pressure: Infinity
    }),
    /Invalid pressure/
);

console.log("Invalid pressure test passed!");

// Test 7: Reject invalid timestamp
assert.throws(
    () => processTelemetry({
        ...validReading,
        timestamp: "not-a-date"
    }),
    /Invalid telemetry timestamp/
);

console.log("Invalid timestamp test passed!");

// Test 8: Reject non-object input
assert.throws(
    () => processTelemetry(null),
    /Telemetry must be a valid object/
);

console.log("Invalid input test passed!");

console.log("\nAll telemetry processor tests passed!");
