const express = require("express");
const { addMemorial, deleteMemorial, getAllMemorials, updateMemorial, getMemorialById } = require('../controllers/memorialController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllMemorials);  // שליפת כל האנדרטאות
router.get("/:id", getMemorialById);  //שליפת אנדרטה ספציפית לפי ID
router.post("/",verifyJWT, addMemorial);  // יצירת אנדרטה חדשה
router.put("/:id",verifyJWT, updateMemorial);  // עדכון אנדרטה
router.delete("/:id",verifyJWT, deleteMemorial);  // מחיקת אנדרטה

module.exports = router;