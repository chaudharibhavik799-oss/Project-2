
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Health check API

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Project-2 backend is running",
        service: "NexusFlow API",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        apiVersion: "1.0.0",
        environment: process.env.NODE_ENV || "development"
    });
});


// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

module.exports = app;
