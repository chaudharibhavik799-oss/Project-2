
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

function validateRule(rule) {
    if (!rule || typeof rule !== "object" || Array.isArray(rule)) {
        throw new Error("Rule must be a valid object");
    }

    if (typeof rule.id !== "string" || !rule.id.trim()) {
        throw new Error("Rule ID is required");
    }

    if (typeof rule.name !== "string" || !rule.name.trim()) {
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
        throw new Error("Threshold must be a finite number");
    }

    if (!supportedSeverities.includes(rule.severity)) {
        throw new Error("Invalid rule severity");
    }

    if (typeof rule.enabled !== "boolean") {
        throw new Error("Enabled must be true or false");
    }

    return true;
}

function loadRules(rules = configuredRules) {
    if (!Array.isArray(rules)) {
        throw new Error("Rules must be an array");
    }

    const ids = new Set();

    rules.forEach((rule) => {
        validateRule(rule);

        if (ids.has(rule.id)) {
            throw new Error(`Duplicate rule ID: ${rule.id}`);
        }

        ids.add(rule.id);
    });

    return rules.map((rule) => ({ ...rule }));
}

module.exports = {
    validateRule,
    loadRules
};
