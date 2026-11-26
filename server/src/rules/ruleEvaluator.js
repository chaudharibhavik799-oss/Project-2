
/**
 * NexusFlow Rule Evaluator
 *
 * Compares processed sensor readings against
 * configured rules and identifies triggered rules.
 */

const {
    validateRule,
    loadRules
} = require("./ruleEngine");

// Compare a sensor value with a rule threshold
const compareValues = (actualValue, operator, threshold) => {
    switch (operator) {
        case ">":
            return actualValue > threshold;

        case "<":
            return actualValue < threshold;

        case ">=":
            return actualValue >= threshold;

        case "<=":
            return actualValue <= threshold;

        case "==":
            return actualValue === threshold;

        case "!=":
            return actualValue !== threshold;

        default:
            throw new Error(
                `Unsupported comparison operator: ${operator}`
            );
    }
};

// Evaluate one rule against a telemetry reading
const evaluateRule = (reading, rule) => {
    if (!reading || typeof reading !== "object") {
        throw new Error("Valid telemetry reading is required");
    }

    validateRule(rule);

    if (!rule.enabled) {
        return {
            ruleId: rule.id,
            triggered: false,
            reason: "Rule is disabled"
        };
    }

    const actualValue = reading[rule.metric];

    if (
        typeof actualValue !== "number" ||
        !Number.isFinite(actualValue)
    ) {
        throw new Error(
            `Invalid telemetry value for ${rule.metric}`
        );
    }

    const triggered = compareValues(
        actualValue,
        rule.operator,
        rule.threshold
    );

    return {
        ruleId: rule.id,
        ruleName: rule.name,
        deviceId: reading.deviceId,
        metric: rule.metric,
        actualValue,
        operator: rule.operator,
        threshold: rule.threshold,
        severity: rule.severity,
        triggered
    };
};

// Evaluate all enabled rules against one reading
const evaluateTelemetry = (reading, rules = loadRules()) => {
    if (!reading || typeof reading !== "object") {
        throw new Error("Valid telemetry reading is required");
    }

    const results = rules.map((rule) =>
        evaluateRule(reading, rule)
    );

    return {
        deviceId: reading.deviceId,
        timestamp: reading.timestamp,
        totalRules: results.length,
        triggeredCount: results.filter(
            (result) => result.triggered
        ).length,
        results,
        triggeredRules: results.filter(
            (result) => result.triggered
        )
    };
};

module.exports = {
    compareValues,
    evaluateRule,
    evaluateTelemetry
};
