
const assert = require("assert");

const {
    compareValues,
    evaluateRule,
    evaluateTelemetry
} = require("./ruleEvaluator");

const sampleReading = {
    deviceId: "DEV001",
    temperature: 45,
    humidity: 60,
    pressure: 30,
    timestamp: new Date().toISOString()
};

// Test 1: Greater-than operator
assert.strictEqual(compareValues(45, ">", 40), true);
console.log("Greater-than test passed!");

// Test 2: Less-than operator
assert.strictEqual(compareValues(20, "<", 25), true);
console.log("Less-than test passed!");

// Test 3: Greater-than-or-equal operator
assert.strictEqual(compareValues(40, ">=", 40), true);
console.log("Greater-than-or-equal test passed!");

// Test 4: Less-than-or-equal operator
assert.strictEqual(compareValues(80, "<=", 80), true);
console.log("Less-than-or-equal test passed!");

// Test 5: Equality operator
assert.strictEqual(compareValues(40, "==", 40), true);
console.log("Equality operator test passed!");

// Test 6: Not-equal operator
assert.strictEqual(compareValues(60, "!=", 70), true);
console.log("Not-equal operator test passed!");

// Test 7: Reject unsupported operator
assert.throws(
    () => compareValues(40, "contains", 40),
    /Unsupported comparison operator/
);
console.log("Unsupported operator test passed!");

// Test 8: Evaluate one matching rule
const temperatureRule = {
    id: "TEST001",
    name: "High Temperature",
    metric: "temperature",
    operator: ">",
    threshold: 40,
    severity: "warning",
    enabled: true
};

const singleResult = evaluateRule(
    sampleReading,
    temperatureRule
);

assert.strictEqual(singleResult.triggered, true);
assert.strictEqual(singleResult.actualValue, 45);
console.log("Single rule evaluation test passed!");

// Test 9: Evaluate an equality rule
const equalityRule = {
    id: "TEST002",
    name: "Exact Temperature",
    metric: "temperature",
    operator: "==",
    threshold: 45,
    severity: "warning",
    enabled: true
};

assert.strictEqual(
    evaluateRule(sampleReading, equalityRule).triggered,
    true
);
console.log("Equality rule evaluation test passed!");

// Test 10: Disabled rule should not trigger
const disabledRule = {
    ...temperatureRule,
    id: "TEST003",
    enabled: false
};

assert.strictEqual(
    evaluateRule(sampleReading, disabledRule).triggered,
    false
);
console.log("Disabled rule test passed!");

// Test 11: Evaluate all configured rules
const rules = [
    temperatureRule,
    equalityRule,
    disabledRule
];

const allResults = evaluateTelemetry(sampleReading, rules);

assert.strictEqual(allResults.totalRules, 3);
assert.strictEqual(allResults.triggeredCount, 2);
assert.strictEqual(allResults.triggeredRules.length, 2);
console.log("Multiple rule evaluation test passed!");

// Test 12: Reject invalid sensor value
assert.throws(
    () => evaluateRule(
        { ...sampleReading, temperature: "hot" },
        temperatureRule
    ),
    /Invalid telemetry value/
);
console.log("Invalid sensor value test passed!");

console.log("\nAll Rule Evaluator tests passed!");
