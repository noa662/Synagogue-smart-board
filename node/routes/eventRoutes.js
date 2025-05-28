const express = require("express");
const { addEvent, deleteEvent, getAllEvents, updateEvent, getEventById } = require('../controllers/eventController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllEvents);  
router.get("/:id", getEventById);  
router.post("/", addEvent);  
router.put("/:id", verifyJWT, updateEvent);  
router.delete("/:id", verifyJWT, deleteEvent);  

module.exports = router;