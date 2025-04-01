const express = require("express");
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post("/register", register); // רישום משתמש חדש
router.post("/login", login); // התחברות למערכת

module.exports = router;