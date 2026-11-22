
const assert = require("assert");
const devices = require("./deviceConfig");
const generateTelemetry = require("./generateTelemetry");

// Test 1: Check that device configuration is an array
assert.ok(Array.isArray(devices));

console.log("Device configuration array test passed!");

// Test 2: Check that at least five devices exist
assert.ok(devices.length >= 5);

console.log("Minimum device count test passed!");

// Test 3: Check that every device has a valid ID
devices.forEach((deviceId) => {
    assert.strictEqual(typeof deviceId, "string");
    assert.ok(deviceId.trim().length > 0);
});

console.log("Device ID validation test passed!");

// Test 4: Check that device IDs are unique
const uniqueDevices = new Set(devices);

assert.strictEqual(uniqueDevices.size, devices.length);

console.log("Unique device ID test passed!");

// Test 5: Check telemetry generation for every device
devices.forEach((deviceId) => {
    const reading = generateTelemetry(deviceId);

    assert.strictEqual(reading.deviceId, deviceId);
    assert.ok(reading.temperature >= 20);
    assert.ok(reading.temperature <= 90);
    assert.ok(reading.humidity >= 30);
    assert.ok(reading.humidity <= 90);
    assert.ok(reading.pressure >= 20);
    assert.ok(reading.pressure <= 50);
    assert.ok(!Number.isNaN(Date.parse(reading.timestamp)));
});

console.log("Telemetry generation for all devices passed!");

console.log("\nAll device configuration tests passed!");
