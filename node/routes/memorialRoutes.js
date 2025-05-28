const express = require("express");
const { addMemorial, deleteMemorial, getAllMemorials, updateMemorial, getMemorialById } = require('../controllers/memorialController');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();

router.get("/", getAllMemorials);
router.get("/:id", getMemorialById);
router.post("/", verifyJWT, addMemorial);
router.put("/:id", verifyJWT, updateMemorial);
router.delete("/:id", verifyJWT, deleteMemorial);

module.exports = router;