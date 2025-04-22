const express = require("express");
const { addEvent, deleteEvent, getAllEvents, updateEvent, getEventById } = require('../controllers/eventController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllEvents);  // שליפת כל האירועים
router.get("/:id", getEventById);  //שליפת אירוע ספציפי לפי ID
router.post("/",verifyJWT, addEvent);  // יצירת אירוע חדש
router.put("/:id",verifyJWT, updateEvent);  // עדכון אירוע
router.delete("/:id",verifyJWT, deleteEvent);  // מחיקת אירוע

module.exports = router;