
const assert = require("assert");

const {
    compareValues,
    evaluateRule,
    evaluateTelemetry
} = require("./ruleEvaluator");

const { loadRules } = require("./ruleEngine");

// Sample telemetry reading.
const reading = {
    deviceId: "DEV001",
    temperature: 65,
    humidity: 85,
    pressure: 20,
    timestamp: new Date().toISOString()
};

// Sample rule.
const temperatureRule = {
    id: "TEST001",
    name: "High Temperature Test",
    metric: "temperature",
    operator: ">",
    threshold: 40,
    severity: "warning",
    enabled: true
};

// TEST 1: Greater-than operator.
assert.strictEqual(compareValues(50, ">", 40), true);
console.log("Greater-than test passed!");

// TEST 2: Less-than operator.
assert.strictEqual(compareValues(20, "<", 25), true);
console.log("Less-than test passed!");

// TEST 3: Greater-than-or-equal operator.
assert.strictEqual(compareValues(40, ">=", 40), true);
console.log("Greater-than-or-equal test passed!");

// TEST 4: Less-than-or-equal operator.
assert.strictEqual(compareValues(25, "<=", 25), true);
console.log("Less-than-or-equal test passed!");

// TEST 5: Equality operator.
assert.strictEqual(compareValues(40, "==", 40), true);
console.log("Equality test passed!");

// TEST 6: Inequality operator.
assert.strictEqual(compareValues(50, "!=", 40), true);
console.log("Inequality test passed!");

// TEST 7: Unsupported operator.
assert.throws(() => {
    compareValues(50, "invalid", 40);
}, /Unsupported operator/);

console.log("Unsupported operator test passed!");

// TEST 8: One matching rule.
const singleResult = evaluateRule(
    reading,
    temperatureRule
);

assert.strictEqual(singleResult.triggered, true);
assert.strictEqual(singleResult.actualValue, 65);
assert.strictEqual(singleResult.threshold, 40);

console.log("Single rule evaluation test passed!");

// TEST 9: Rule should not trigger below threshold.
const normalReading = {
    deviceId: "DEV002",
    temperature: 25,
    humidity: 50,
    pressure: 35,
    timestamp: new Date().toISOString()
};

const normalResult = evaluateRule(
    normalReading,
    temperatureRule
);

assert.strictEqual(normalResult.triggered, false);

console.log("Non-triggered rule test passed!");

// TEST 10: Disabled rule.
const disabledRule = {
    ...temperatureRule,
    enabled: false
};

const disabledResult = evaluateRule(
    reading,
    disabledRule
);

assert.strictEqual(disabledResult.triggered, false);
assert.strictEqual(
    disabledResult.reason,
    "Rule is disabled"
);

console.log("Disabled rule test passed!");

// TEST 11: Invalid sensor value.
const invalidReading = {
    ...reading,
    temperature: "high"
};

assert.throws(() => {
    evaluateRule(invalidReading, temperatureRule);
}, /Invalid reading for metric/);

console.log("Invalid sensor reading test passed!");

// TEST 12: Evaluate all configured rules.
const configuredRules = loadRules();

const multipleResult = evaluateTelemetry(
    reading,
    configuredRules
);

assert.strictEqual(
    multipleResult.totalRules,
    configuredRules.length
);

assert.strictEqual(
    multipleResult.triggeredCount,
    4
);

console.log("Multiple rule evaluation test passed!");

// TEST 13: Normal readings should not trigger the example rules.
const normalMultipleResult = evaluateTelemetry(
    normalReading,
    configuredRules
);

assert.strictEqual(
    normalMultipleResult.triggeredCount,
    0
);

console.log("Normal telemetry test passed!");

// TEST 14: Custom threshold evaluation.
const customRule = {
    id: "CUSTOM001",
    name: "Custom Temperature Rule",
    metric: "temperature",
    operator: ">",
    threshold: 30,
    severity: "warning",
    enabled: true
};

const customReading = {
    deviceId: "DEV003",
    temperature: 35,
    humidity: 50,
    pressure: 35,
    timestamp: new Date().toISOString()
};

const customResult = evaluateTelemetry(
    customReading,
    [customRule]
);

assert.strictEqual(customResult.triggeredCount, 1);

console.log("Custom threshold test passed!");

// TEST 15: Invalid telemetry object.
assert.throws(() => {
    evaluateTelemetry(null, configuredRules);
}, /Invalid telemetry reading/);

console.log("Invalid telemetry object test passed!");

console.log("\nAll Rule Evaluator tests passed!");
