const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../Utils/HashUtils");

// סכמת משתמש
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// הצפנת סיסמה לפני שמירת המשתמש
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// פונקציה לאימות סיסמה (משתמשת בפונקציה מ-`Utils/hashUtils`)
userSchema.methods.comparePassword = function (password) {
  return comparePassword(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
