const express = require("express");
const { addUser, deleteUser, getAllUsers, updateUser, getUser } = require("../Controllers/UserController");

const router = express.Router();

router.get("/", getAllUsers);  // שליפת כל המשתמשים 
router.get("/:id", getUser);  // שליפת משתמש ספציפי לפי ID
router.post("/", addUser);  // יצירת משתמש חדש
router.put("/:id", updateUser);  // עדכון משתמש
router.delete("/:id", deleteUser);  // מחיקת משתמש

module.exports = router;