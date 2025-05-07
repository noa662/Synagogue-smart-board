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

router.get("/", getAllPrayerTimes);  // שליפת כל זמני התפילות
//router.get("/:id", getPrayerTimeById);  // שליפת זמן תפילה ספציפי לפי ID
router.post("/", addPrayerTime);  // יצירת זמן תפילה חדש
router.put("/:id",verifyJWT, updatePrayerTime);  // עדכון זמן תפילה
router.delete("/:id", verifyJWT, deletePrayerTime);  // מחיקת זמן תפילה
router.get("/getPrayerTimesByDate", getPrayerTimesByDate); //שליפת זמן תפילה לפי תאריך

module.exports = router;
