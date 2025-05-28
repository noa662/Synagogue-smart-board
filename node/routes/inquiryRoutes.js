const express = require("express");
const { addInquiry, deleteInquiry, updateInquiry, getAllInquies, getInquiryById } = require('../controllers/inquiryController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllInquies);  
router.get("/:id", getInquiryById); 
router.post("/", addInquiry);  
router.put("/:id", updateInquiry);  
router.delete("/:id", deleteInquiry); 

module.exports = router;