
const assert = require("assert");
const generateTelemetry = require("./generateTelemetry");

// Test 1: Generate valid telemetry
const reading = generateTelemetry("DEV001");

assert.strictEqual(reading.deviceId, "DEV001");
assert.ok(reading.temperature >= 20 && reading.temperature <= 90);
assert.ok(reading.humidity >= 30 && reading.humidity <= 90);
assert.ok(reading.pressure >= 20 && reading.pressure <= 50);
assert.ok(!Number.isNaN(Date.parse(reading.timestamp)));

console.log("Valid telemetry test passed!");

// Test 2: Reject missing device ID
assert.throws(() => generateTelemetry(""));

console.log("Missing device ID test passed!");

// Test 3: Reject invalid device ID type
assert.throws(() => generateTelemetry(123));

console.log("Invalid device ID test passed!");

console.log("All telemetry tests completed successfully.");
