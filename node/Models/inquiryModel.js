const mongoose = require("mongoose");

//סכמת פניות
const inquirySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true} ,
  date: { type: Date, required: true },
  subjectOfInquiry: {type: String, required: false},
  description: { type: String, required: false }
});

module.exports = mongoose.model("Inquiry", inquirySchema);
