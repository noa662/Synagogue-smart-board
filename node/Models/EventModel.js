const mongoose = require("mongoose");

//סכמת לוח אירועים
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Event", eventSchema);
