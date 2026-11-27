const express = require("express");

const {
    createRule,
    getRules,
    updateRule,
    deleteRule
} = require("../controllers/ruleController");

const router = express.Router();

router.post("/", createRule);
router.get("/", getRules);
router.put("/:id", updateRule);
router.delete("/:id", deleteRule);

module.exports = router;