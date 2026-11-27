const express = require("express");

const {
    createDevice,
    getDevices,
    getDeviceById,
    updateDevice,
    deleteDevice
} = require("../controllers/deviceController");

const router = express.Router();

router.post("/", createDevice);
router.get("/", getDevices);
router.get("/:deviceId", getDeviceById);
router.put("/:deviceId", updateDevice);
router.delete("/:deviceId", deleteDevice);

module.exports = router;