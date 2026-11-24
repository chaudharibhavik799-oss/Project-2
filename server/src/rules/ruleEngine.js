
/**
 * NexusFlow Rule Engine
 *
 * Validates and prepares configured rules
 * for future telemetry evaluation.
 */

const configuredRules = require("./ruleConfig");

const supportedMetrics = [
    "temperature",
    "humidity",
    "pressure"
];

const supportedOperators = [
    ">",
    "<",
    ">=",
    "<=",
    "==",
    "!="
];

const supportedSeverities = [
    "warning",
    "critical"
];

// Validate an individual rule
const validateRule = (rule) => {
    if (!rule || typeof rule !== "object" || Array.isArray(rule)) {
        throw new Error("Rule must be a valid object");
    }

    if (!rule.id || typeof rule.id !== "string") {
        throw new Error("Rule ID is required");
    }

    if (!rule.name || typeof rule.name !== "string") {
        throw new Error("Rule name is required");
    }

    if (!supportedMetrics.includes(rule.metric)) {
        throw new Error("Unsupported sensor metric");
    }

    if (!supportedOperators.includes(rule.operator)) {
        throw new Error("Unsupported comparison operator");
    }

    if (
        typeof rule.threshold !== "number" ||
        !Number.isFinite(rule.threshold)
    ) {
        throw new Error("Rule threshold must be a valid number");
    }

    if (!supportedSeverities.includes(rule.severity)) {
        throw new Error("Invalid rule severity");
    }

    if (typeof rule.enabled !== "boolean") {
        throw new Error("Rule enabled status must be boolean");
    }

    return true;
};

// Validate all configured rules
const loadRules = (rules = configuredRules) => {
    if (!Array.isArray(rules)) {
        throw new Error("Rules must be provided as an array");
    }

    rules.forEach(validateRule);

    const ruleIds = rules.map((rule) => rule.id);

    if (new Set(ruleIds).size !== ruleIds.length) {
        throw new Error("Duplicate rule IDs are not allowed");
    }

    return rules.map((rule) => ({ ...rule }));
};

// Export Rule Engine functions
module.exports = {
    validateRule,
    loadRules
};
