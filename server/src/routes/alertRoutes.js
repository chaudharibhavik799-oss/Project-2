const express = require("express");

const {
    getAlerts,
    getDeviceAlerts,
    resolveAlert
} = require("../controllers/alertController");

const router = express.Router();

router.get("/", getAlerts);
router.get("/device/:deviceId", getDeviceAlerts);
router.patch("/:id/resolve", resolveAlert);

module.exports = router;