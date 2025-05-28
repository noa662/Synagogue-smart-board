const express = require("express");
const verifyJWT = require("../middleware/verifyJWT")
const { addSetting, deleteSetting, getAllSettings, updateSetting, getSetting, resetSettings } = require('../controllers/settingController');

const router = express.Router();

router.get("/", getAllSettings); 
router.get("/:id",verifyJWT, getSetting);  
router.post("/", addSetting);  
router.put("/:id",verifyJWT, updateSetting); 
router.delete("/:id",verifyJWT, deleteSetting);  
router.post("/reset",verifyJWT, resetSettings);  

module.exports = router;