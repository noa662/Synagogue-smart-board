const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// הגדרת storage ל-multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 7 * 1024 * 1024 }
});

// נתיב להעלאת תמונה אחת בשם "image"
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "לא נשלח קובץ" });
  }

  // מחזיר URL שניתן להשתמש בו בגישה לתמונה
  const imageUrl = `http://localhost:${process.env.PORT || 8080}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
