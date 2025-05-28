const User = require('../models/userModel');

async function addUser(req, res) {
    console.log("נתונים שהתקבלו ב-body:", req.body);
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: error.message });
    };
};

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        if (!userId)
            return res.status(400).send({ error: "ID is required" });
        const userD = await User.findById(userId);
        if (!userD)
            return res.status(404).send({ error: "User not found" });
        await User.deleteOne({ _id: userId });
        res.status(200).send({ message: "Deleted successfully", user: userD });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedUser = await User.findByIdAndUpdate(id, updates, options).select({ password: 0 });
        if (!updatedUser)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getUserByName(req, res) {

    try {
        const { name } = req.params;
        console.log("Username param received:", name)
        const user = await User.findOne({ username: name });
        console.log(user);
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select({ password: 0 }); 
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    addUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getUser,
    getUserByName
};