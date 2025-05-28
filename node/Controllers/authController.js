const User = require("../models/userModel");
const { generateToken } = require("../config/jwt-temp");
const jwt = require("jsonwebtoken");

exports.getUserByToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid or missing token" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, email, role, adminPassword } = req.body;
        if (role === "admin") {
            if (adminPassword !== process.env.ADMIN_PASSWORD) {
                return res.status(403).json({ message: "סיסמת מנהל שגויה" });
            }
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            username,
            password,
            email,
            role: role || "user",
        });
        await newUser.save();
        const token = await generateToken(newUser._id);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error("Error in register:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Attempting login for:", username);
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await generateToken(user._id);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
