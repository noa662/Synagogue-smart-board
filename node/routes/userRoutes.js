const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const { addUser, deleteUser, getAllUsers, updateUser, getUser, getUserByName } = require('../Controllers/UserController')

const router = express.Router();

router.get("/", getAllUsers); 
router.get("/ByName/:name", getUserByName); 
router.get("/:id", getUser);  
router.post("/", addUser);  
router.put("/:id", updateUser);  
router.delete("/:id",verifyJWT, deleteUser); 

module.exports = router;
