const express = require("express");
const { addMemorial, deleteMemorial, getAllMemorials, updateMemorial, getMemorialById } = require("../Controllers/MemorialController");

const router = express.Router();

router.get("/", getAllMemorials);  // שליפת כל האנדרטאות
router.get("/:id", getMemorialById);  //שליפת אנדרטה ספציפית לפי ID
router.post("/", addMemorial);  // יצירת אנדרטה חדשה
router.put("/:id", updateMemorial);  // עדכון אנדרטה
router.delete("/:id", deleteMemorial);  // מחיקת אנדרטה

module.exports = router;