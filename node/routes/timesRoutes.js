const express = require("express");
const router = express.Router();
const { calculateHalachicTimes } = require('../utils/halachicTimesCalculator');

router.get("/", (req, res) => {
    const { lat, lon, elevation } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: "Missing latitude or longitude" });
    }
    try {
        const zmanim = calculateHalachicTimes(
            parseFloat(lat),
            parseFloat(lon),
            parseFloat(elevation) || 0
        );
        res.json(zmanim);
    } catch (error) {
        console.error("Error calculating zmanim:", error);
        res.status(500).json({ error: "Failed to calculate zmanim" });
    }
});

module.exports = router;
