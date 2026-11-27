
const assert = require("node:assert/strict");

const configuredRules = require("./ruleConfig");
const { validateRule, loadRules } = require("./ruleEngine");
const { evaluateTelemetry } = require("./ruleEvaluator");

console.log("Starting configurable rule tests...");

// Test 1: Configuration should be an array.
assert.ok(Array.isArray(configuredRules));
console.log("PASS: Rule configuration is an array");

// Test 2: At least four rules should be configured.
assert.ok(configuredRules.length >= 4);
console.log("PASS: Four or more rules are configured");

// Test 3: All configured rules should be valid.
configuredRules.forEach((rule) => {
    assert.equal(validateRule(rule), true);
});
console.log("PASS: All configured rules are valid");

// Test 4: Rule IDs should be unique.
const ids = configuredRules.map((rule) => rule.id);
assert.equal(new Set(ids).size, ids.length);
console.log("PASS: Rule IDs are unique");

// Test 5: Rules should load successfully.
const loadedRules = loadRules();
assert.equal(loadedRules.length, configuredRules.length);
console.log("PASS: Rules load successfully");

// Test 6: Invalid metric should be rejected.
assert.throws(() => {
    validateRule({
        id: "BAD001",
        name: "Invalid Metric",
        metric: "speed",
        operator: ">",
        threshold: 50,
        severity: "warning",
        enabled: true
    });
}, /Unsupported sensor metric/);
console.log("PASS: Invalid metric is rejected");

// Test 7: Invalid threshold should be rejected.
assert.throws(() => {
    validateRule({
        id: "BAD002",
        name: "Invalid Threshold",
        metric: "temperature",
        operator: ">",
        threshold: "40",
        severity: "warning",
        enabled: true
    });
}, /Threshold must be a finite number/);
console.log("PASS: Invalid threshold is rejected");

// Test 8: Configured thresholds should trigger correctly.
const reading = {
    deviceId: "DEV001",
    temperature: 65,
    humidity: 85,
    pressure: 20,
    timestamp: new Date().toISOString()
};

const result = evaluateTelemetry(reading);

assert.equal(result.triggeredCount, 4);
console.log("PASS: All four configured rules trigger");

// Test 9: Lower temperature should not trigger temperature rules.
const normalReading = {
    deviceId: "DEV002",
    temperature: 30,
    humidity: 50,
    pressure: 40,
    timestamp: new Date().toISOString()
};

const normalResult = evaluateTelemetry(normalReading);

assert.equal(normalResult.triggeredCount, 0);
console.log("PASS: Normal readings do not trigger configured rules");

// Test 10: Custom threshold should be used.
const customRules = [
    {
        id: "CUSTOM001",
        name: "Custom Temperature Rule",
        metric: "temperature",
        operator: ">",
        threshold: 30,
        severity: "warning",
        enabled: true
    }
];

const customResult = evaluateTelemetry(
    normalReading,
    customRules
);

assert.equal(customResult.triggeredCount, 0);
assert.equal(customResult.totalRules, 1);
console.log("PASS: Custom threshold configuration is respected");

console.log("All configurable rule tests passed!");
