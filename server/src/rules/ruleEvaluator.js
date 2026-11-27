
const { validateRule, loadRules } = require("./ruleEngine");

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

function evaluateRule(reading, rule) {
    if (!reading || typeof reading !== "object" || Array.isArray(reading)) {
        throw new Error("Invalid telemetry reading");
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
        throw new Error(`Invalid reading for metric: ${rule.metric}`);
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
}

function evaluateTelemetry(reading, rules = loadRules()) {
    if (!Array.isArray(rules)) {
        throw new Error("Rules must be an array");
    }

    const results = rules.map((rule) =>
        evaluateRule(reading, rule)
    );

    const triggeredRules = results.filter(
        (result) => result.triggered
    );

    return {
        deviceId: reading.deviceId,
        timestamp: reading.timestamp,
        totalRules: results.length,
        triggeredCount: triggeredRules.length,
        results,
        triggeredRules
    };
}

module.exports = {
    compareValues,
    evaluateRule,
    evaluateTelemetry
};
