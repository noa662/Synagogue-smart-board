const mongoose = require("mongoose");

//סכמת הגדרות
const settingsSchema = new mongoose.Schema({
  themeColor: { type: String, required: true }, // צבעים
  layout: { type: String, required: true }, // עיצוב הלוח
  displayOptions: { type: Map, of: Boolean }, // הגדרות תצוגה שונות
});

module.exports = mongoose.model("Settings", settingsSchema);
