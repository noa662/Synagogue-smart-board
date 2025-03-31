const express = require("express");
const { addEvent, deleteEvent, getAllEvents, updateEvent, getEventById } = require("../Controllers/EventController");

const router = express.Router();

router.get("/", getAllEvents);  // שליפת כל האירועים
router.get("/:id", getEventById);  //שליפת אירוע ספציפי לפי ID
router.post("/", addEvent);  // יצירת אירוע חדש
router.put("/:id", updateEvent);  // עדכון אירוע
router.delete("/:id", deleteEvent);  // מחיקת אירוע

module.exports = router;