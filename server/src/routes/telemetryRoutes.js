const express = require("express");

const {
    createTelemetry,
    getTelemetry,
    getDeviceTelemetry
} = require("../controllers/telemetryController");

const validateTelemetry = require("../middleware/validateTelemetry");

const router = express.Router();

router.post("/", validateTelemetry, createTelemetry);
router.get("/", getTelemetry);
router.get("/:deviceId", getDeviceTelemetry);

module.exports = router;