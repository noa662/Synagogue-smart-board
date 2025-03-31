const express = require("express");
const {
    getAllPrayerTimes,
    getPrayerTimeById,
    addPrayerTime,
    updatePrayerTime,
    deletePrayerTime
} = require("../Controllers/PrayerTimeController");

const router = express.Router();

router.get("/", getAllPrayerTimes);  // שליפת כל זמני התפילות
router.get("/:id", getPrayerTimeById);  // שליפת זמן תפילה ספציפי לפי ID
router.post("/", addPrayerTime);  // יצירת זמן תפילה חדש
router.put("/:id", updatePrayerTime);  // עדכון זמן תפילה
router.delete("/:id", deletePrayerTime);  // מחיקת זמן תפילה

module.exports = router;
