
const assert = require("assert");

const rules = require("./ruleConfig");

const {
    validateRule,
    loadRules
} = require("./ruleEngine");

// Test 1: Load configured rules
const loadedRules = loadRules();

assert.ok(Array.isArray(loadedRules));
assert.strictEqual(loadedRules.length, rules.length);

console.log("Rule loading test passed!");

// Test 2: Validate a correct rule
const validRule = {
    id: "TEST001",
    name: "Test Temperature Rule",
    metric: "temperature",
    operator: ">",
    threshold: 40,
    severity: "warning",
    enabled: true
};

assert.strictEqual(validateRule(validRule), true);

console.log("Valid rule test passed!");

// Test 3: Reject unsupported metric
assert.throws(
    () => validateRule({
        ...validRule,
        metric: "battery"
    }),
    /Unsupported sensor metric/
);

console.log("Invalid metric test passed!");

// Test 4: Reject invalid operator
assert.throws(
    () => validateRule({
        ...validRule,
        operator: "contains"
    }),
    /Unsupported comparison operator/
);

console.log("Invalid operator test passed!");

// Test 5: Reject invalid threshold
assert.throws(
    () => validateRule({
        ...validRule,
        threshold: "high"
    }),
    /Threshold must be a finite number/
);

console.log("Invalid threshold test passed!");

// Test 6: Reject invalid severity
assert.throws(
    () => validateRule({
        ...validRule,
        severity: "unknown"
    }),
    /Invalid rule severity/
);

console.log("Invalid severity test passed!");

// Test 7: Reject duplicate rule IDs
assert.throws(
    () => loadRules([
        validRule,
        { ...validRule, name: "Duplicate Rule" }
    ]),
    /Duplicate rule ID/
);

console.log("Duplicate rule test passed!");

// Test 8: Reject non-array input
assert.throws(
    () => loadRules(null),
    /Rules must be an array/
);

console.log("Invalid rule collection test passed!");

console.log("\nAll Rule Engine tests passed!");
