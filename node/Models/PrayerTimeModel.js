const mongoose = require("mongoose");

//סכמת זמני תפילות
const prayerTimeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  shacharit: { type: String, required: true },
  mincha: { type: String, required: true },
  maariv: { type: String, required: true },
  location: { type: String, required: true }, // מיקום גיאוגרפי לחישוב זמני תפילה
});

module.exports = mongoose.model("PrayerTime", prayerTimeSchema);
