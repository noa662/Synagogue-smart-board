const mongoose = require("mongoose");

//סכמת הגדרות
const settingsSchema = new mongoose.Schema({
  themeColor: { type: String, required: true }, // צבעים
  font: { type: String, required: true }, // גופן
   background: { type: String , required: true }, // תמונת רקע
});

module.exports = mongoose.model("Settings", settingsSchema);
