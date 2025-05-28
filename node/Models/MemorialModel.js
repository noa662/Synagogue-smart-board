const mongoose = require("mongoose");

//סכמת לוח הנצחה
const memorialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfDeath: { type: Date, required: true },
  description: { type: String, required: false },
  family: { type: String, required: false } 
});

module.exports = mongoose.model("Memorial", memorialSchema);
