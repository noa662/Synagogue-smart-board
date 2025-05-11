const express = require("express");
const { register, login, getUserByToken } = require('../controllers/authController');
const User = require('../models/userModel');

const router = express.Router();

router.post("/register", register); // רישום משתמש חדש
router.post("/login", login); // התחברות למערכת
router.get("/getUserFromToken", getUserByToken); // שליפת משתמש ע"י טוקן

module.exports = router;