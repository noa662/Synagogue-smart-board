const User = require("../models/userModel");
const { generateToken } = require("../config/jwt-temp");

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const newUser = new User({
            username,
            password,
            email,
            role: role || "user",
        });
        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({ token, user: { id: newUser._id, username } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    };
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password)))
            return res.status(400).json({ message: "Invalid credentials" });
        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, username } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    };
};