const express = require("express");
const verifyJWT = require("../middleware/verifyJWT")
const { addSetting, deleteSetting, getAllSettings, updateSetting, getSetting, resetSettings } = require('../controllers/settingController');

const router = express.Router();

router.get("/",verifyJWT, getAllSettings);  // שליפת כל ההגדרות
router.get("/:id",verifyJWT, getSetting);  // שליפת הגדרה ספציפית לפי ID
router.post("/",verifyJWT, addSetting);  // יצירת הגדרה חדשה
router.put("/:id",verifyJWT, updateSetting);  // עדכון הגדרה
router.delete("/:id",verifyJWT, deleteSetting);  // מחיקת הגדרה
router.post("/reset",verifyJWT, resetSettings);  // איפוס ההגדרות

module.exports = router;