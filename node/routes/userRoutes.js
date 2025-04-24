const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const { addUser, deleteUser, getAllUsers, updateUser, getUser, getUserByName } = require('../controllers/userController');

const router = express.Router();

router.get("/", getAllUsers);  // שליפת כל המשתמשים 
router.get("/ByName/:name", getUserByName); // שליפת משתשמש ספציפי לפי שם
router.get("/:id", getUser);  // שליפת משתמש ספציפי לפי ID
router.post("/", addUser);  // יצירת משתמש חדש
router.put("/:id", updateUser);  // עדכון משתמש
router.delete("/:id",verifyJWT, deleteUser);  // מחיקת משתמש

module.exports = router;
