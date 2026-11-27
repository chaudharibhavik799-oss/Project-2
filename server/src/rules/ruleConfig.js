
/**
 * NexusFlow Rule Configuration
 *
 * Stores configurable rules for IoT sensor monitoring.
 */


const rules = [
    {
        id: "RULE001",
        name: "High Temperature Warning",
        metric: "temperature",
        operator: ">",
        threshold: 40,
        severity: "warning",
        enabled: true
    },
    {
        id: "RULE002",
        name: "Critical Temperature Alert",
        metric: "temperature",
        operator: ">",
        threshold: 60,
        severity: "critical",
        enabled: true
    },
    {
        id: "RULE003",
        name: "High Humidity Warning",
        metric: "humidity",
        operator: ">",
        threshold: 80,
        severity: "warning",
        enabled: true
    },
    {
        id: "RULE004",
        name: "Low Pressure Warning",
        metric: "pressure",
        operator: "<",
        threshold: 25,
        severity: "warning",
        enabled: true
    }
];

module.exports = rules;
