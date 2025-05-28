const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/hashUtils");

// סכמת משתמש
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  adminPassword: { type: String, default: null }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  if (this.role === "admin" && this.adminPassword) {
    this.adminPassword = await hashPassword(this.adminPassword);
  } else {
    this.adminPassword = null;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
