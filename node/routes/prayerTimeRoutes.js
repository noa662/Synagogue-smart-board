const express = require("express");
const {
    getAllPrayerTimes,
    getPrayerTimeById,
    addPrayerTime,
    updatePrayerTime,
    deletePrayerTime,
    getPrayerTimesByDate,
} = require('../controllers/prayerTimeController');
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router();

router.get("/", getAllPrayerTimes);
//router.get("/:id", getPrayerTimeById); 
router.post("/", addPrayerTime);
router.put("/:id", verifyJWT, updatePrayerTime);
router.delete("/:id", verifyJWT, deletePrayerTime);
router.get("/getPrayerTimesByDate", getPrayerTimesByDate);

module.exports = router;
