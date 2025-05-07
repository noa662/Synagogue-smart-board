const express = require("express");
const { addInquiry, deleteInquiry, updateInquiry, getAllInquies, getInquiryById } = require('../controllers/inquiryController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllInquies);  // שליפת כל הפניות
router.get("/:id", getInquiryById);  //שליפת פנייה ספציפי לפי ID
router.post("/", addInquiry);  // יצירת פנייה חדשה
router.put("/:id", updateInquiry);  // עדכון פנייה
router.delete("/:id", deleteInquiry);  // מחיקת פנייה

module.exports = router;