const express = require("express");
const { register, login, getUserByToken } = require('../controllers/authController');
const User = require('../models/userModel');

const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.get("/getUserFromToken", getUserByToken); 

module.exports = router;