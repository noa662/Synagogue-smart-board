const mongoose = require("mongoose");

//סכמת הגדרות
const settingsSchema = new mongoose.Schema({
  themeColor: { type: String, required: true },
  font: { type: String, required: true },
  background: { type: String, required: true },
});

module.exports = mongoose.model("Settings", settingsSchema);
