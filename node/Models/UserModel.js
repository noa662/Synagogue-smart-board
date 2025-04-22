const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/hashUtils");

// סכמת משתמש
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  adminPassword: selectedRole === "admin" ? adminPassword : null
});

// הצפנת סיסמה לפני שמירת המשתמש
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

// פונקציה להשוואת סיסמאות
userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password); // שימוש בפונקציה החיצונית
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
