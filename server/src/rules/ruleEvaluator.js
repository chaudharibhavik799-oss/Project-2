
const { validateRule, loadRules } = require("./ruleEngine");

// Compare an actual sensor value with a configured threshold.
function compareValues(actualValue, operator, threshold) {
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
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

// Evaluate one rule against one telemetry reading.
function evaluateRule(reading, rule) {
    if (
        !reading ||
        typeof reading !== "object" ||
        Array.isArray(reading)
    ) {
        throw new Error("Invalid telemetry reading");
    }

    validateRule(rule);

    // Ignore disabled rules.
    if (!rule.enabled) {
        return {
            ruleId: rule.id,
            ruleName: rule.name,
            deviceId: reading.deviceId,
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
            `Invalid reading for metric: ${rule.metric}`
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
        actualValue: actualValue,
        operator: rule.operator,
        threshold: rule.threshold,
        severity: rule.severity,
        triggered: triggered
    };
}

// Evaluate all configured rules against one telemetry reading.
function evaluateTelemetry(reading, rules = loadRules()) {
    if (
        !reading ||
        typeof reading !== "object" ||
        Array.isArray(reading)
    ) {
        throw new Error("Invalid telemetry reading");
    }

    if (!Array.isArray(rules)) {
        throw new Error("Rules must be an array");
    }

    const results = rules.map((rule) => {
        return evaluateRule(reading, rule);
    });

    const triggeredRules = results.filter((result) => {
        return result.triggered === true;
    });

    return {
        deviceId: reading.deviceId,
        timestamp: reading.timestamp,
        totalRules: results.length,
        triggeredCount: triggeredRules.length,
        results: results,
        triggeredRules: triggeredRules
    };
}

module.exports = {
    compareValues,
    evaluateRule,
    evaluateTelemetry
};
